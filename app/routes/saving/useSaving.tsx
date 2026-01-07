import { useQuery } from "@tanstack/react-query";
import { getSaving } from "~/Services/saving.service";
import useAuthentication from "~/hook/useAuthentication";

const useSaving = () => {
  const { token } = useAuthentication();
  const { data, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: () => getSaving(token?.id as string),
  });
  return {
    data,
    isLoading,
  };
};
export default useSaving;
