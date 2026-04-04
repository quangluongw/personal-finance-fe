import { useQuery } from "@tanstack/react-query";
import { getDept } from "~/Services/dept.service";
import useAuthentication from "~/hook/useAuthentication";

const useDept = () => {
  const { token } = useAuthentication();

  const { data, isLoading } = useQuery({
    queryKey: ["dept"],
    queryFn: () => getDept(token?.id as string),
  });
  return {
    data,
    isLoading,
  };
};
export default useDept;
