import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { Caterories } from "~/Services/catgerori.service";
import {
  getTotalTransactionHistory,
  getTransaction,
} from "~/Services/transactions.service";
import useAuthentication from "~/hook/useAuthentication";

const useHistory = () => {
  const [searchParam] = useSearchParams();
  const params = Object.fromEntries(searchParam.entries());

  const { token } = useAuthentication();

  const { data, isLoading } = useQuery({
    queryKey: ["history", params],
    queryFn: () => getTransaction(token?.id as string, params),
  });

  const { data: dataCaterori, isLoading: isCateroriLoading } = useQuery({
    queryKey: ["caterories", params],
    queryFn: () => Caterories(),
  });

  const { data: totalTransaction, isLoading: istotalTransactionLoading } =
    useQuery({
      queryKey: ["totalhistory", params],
      queryFn: () => getTotalTransactionHistory(token?.id as string, params),
    });

  return {
    data,
    isLoading,
    totalTransaction,
    istotalTransactionLoading,
    dataCaterori,
    isCateroriLoading,
  };
};

export default useHistory;
