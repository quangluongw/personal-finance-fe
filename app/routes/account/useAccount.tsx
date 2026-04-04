import { useQuery } from "@tanstack/react-query";
import { getAccount } from "~/Services/account.service";
import useAuthentication from "~/hook/useAuthentication";

const useAccount = () => {
  const { token } = useAuthentication();

  const { data, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: () => getAccount(token?.id as string),
  });
  return {
    data,
    isLoading,
  };
};
export default useAccount;
