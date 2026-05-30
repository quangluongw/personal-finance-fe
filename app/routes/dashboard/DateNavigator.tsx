import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import type { ViewType } from "./useDashboard";


dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

interface DateNavigatorProps {
  currentView: ViewType;
  offset: number;
  onOffsetChange: (offset: number) => void;
}

// Tính ngày đại diện từ offset để truyền vào DatePicker
const offsetToDate = (type: ViewType, offset: number): Dayjs => {
  if (type === "week") return dayjs().add(offset * 7, "day");
  if (type === "month") return dayjs().add(offset, "month");
  return dayjs().add(offset, "year");
};

// Tính offset từ giá trị picker chọn về
const dateToOffset = (type: ViewType, value: Dayjs): number => {
  const now = dayjs();
  if (type === "week") {
    const diffDays = value
      .startOf("isoWeek")
      .diff(now.startOf("isoWeek"), "day");
    return Math.round(diffDays / 7);
  }
  if (type === "month") return value.diff(now.startOf("month"), "month");
  return value.year() - now.year();
};

export function DateNavigator({
  currentView,
  offset,
  onOffsetChange,
}: DateNavigatorProps) {
  const value = offsetToDate(currentView, offset);

  const handleChange = (val: Dayjs | null) => {
    if (!val) return;
    onOffsetChange(dateToOffset(currentView, val));
  };

  const pickerProps = {
    value,
    onChange: handleChange,
    allowClear: false,
    disabledDate: (d: Dayjs) =>
      d.isAfter(dayjs(), currentView === "week" ? "week" : currentView),
    style: { width: 220 },
    size: "large" as const,
  };

  if (currentView === "week") {
    return (
      <DatePicker
        {...pickerProps}
        picker="week"
        format={(val) => {
          const from = val.startOf("isoWeek").format("DD/MM/YYYY");
          const to = val.endOf("isoWeek").format("DD/MM/YYYY");
          return `${from} – ${to}`;
        }}
      />
    );
  }

  if (currentView === "month") {
    return <DatePicker {...pickerProps} picker="month" format="MM/YYYY" />;
  }

  return <DatePicker {...pickerProps} picker="year" format="YYYY" />;
}
