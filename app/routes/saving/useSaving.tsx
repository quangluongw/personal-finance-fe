import { useQuery } from "@tanstack/react-query";
import { getSavings } from "~/Services/saving.service";
import useAuthentication from "~/hook/useAuthentication";

const useSaving = () => {
  const { token } = useAuthentication();
  const { data, isLoading } = useQuery({
    queryKey: ["saving"],
    queryFn: () => getSavings(token?.id as string),
  });
  return {
    data,
    isLoading,
  };
};
export default useSaving;
