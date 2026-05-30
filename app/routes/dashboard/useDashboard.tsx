import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Dashboard } from "~/Services/dashboard.service";
import useAuthentication from "~/hook/useAuthentication";

export type ViewType = "week" | "month" | "year";

export interface DateRange {
  label: string;
  rangeText: string;
  apiDate: string;
}

const fmt = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;

export const computeDateRange = (type: ViewType, offset: number): DateRange => {
  const now = new Date();

  if (type === "week") {
    const base = new Date(now);
    base.setDate(now.getDate() + offset * 7);
    const dow = base.getDay() === 0 ? 7 : base.getDay();
    const from = new Date(base);
    from.setDate(base.getDate() - dow + 1);
    from.setHours(0, 0, 0, 0);
    const to = new Date(from);
    to.setDate(from.getDate() + 6);
    to.setHours(23, 59, 59, 999);
    const label =
      offset === 0
        ? "Tuần này"
        : offset === -1
          ? "Tuần trước"
          : `Tuần ${fmt(from).slice(0, 5)}`;
    const apiDate = `${from.getFullYear()}-${String(from.getMonth() + 1).padStart(2, "0")}-${String(from.getDate()).padStart(2, "0")}`;
    return { label, rangeText: `${fmt(from)} – ${fmt(to)}`, apiDate };
  }

  if (type === "month") {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const from = new Date(d.getFullYear(), d.getMonth(), 1);
    const to = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const label =
      offset === 0
        ? "Tháng này"
        : `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
    const apiDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return { label, rangeText: `${fmt(from)} – ${fmt(to)}`, apiDate };
  }

  // year
  const year = now.getFullYear() + offset;
  const label = offset === 0 ? "Năm nay" : `Năm ${year}`;
  return {
    label,
    rangeText: `01/01/${year} – 31/12/${year}`,
    apiDate: `${year}`,
  };
};

// useDashboard.ts - bỏ dateRange khỏi return nếu chỉ dùng nội bộ
const useDashboard = (type: ViewType = "month", offset: number = 0) => {
  const { token } = useAuthentication();

  const dateRange = useMemo(
    () => computeDateRange(type, offset),
    [type, offset]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", type, dateRange.apiDate],
    queryFn: () => Dashboard(token?.id as string, type, dateRange.apiDate),
    enabled: !!token?.id,
  });

  // Chỉ export dateRange nếu component cha thực sự cần hiển thị
  return { data, isLoading };
};

export default useDashboard;
