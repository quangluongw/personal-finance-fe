// useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import { Dashboard } from "~/Services/dashboard.service";
import useAuthentication from "~/hook/useAuthentication";

const useDashboard = (type: "week" | "month" | "year" = "month") => {
  const { token } = useAuthentication();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", type], // thêm type vào key → tự refetch khi type đổi
    queryFn: () => Dashboard(token?.id as string, type),
    enabled: !!token?.id,
  });

  return { data, isLoading };
};

export default useDashboard;
