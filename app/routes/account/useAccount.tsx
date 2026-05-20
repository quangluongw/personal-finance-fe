import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, getAccount } from "~/Services/account.service";
import useAuthentication from "~/hook/useAuthentication";
import useSendMessage from "~/hook/useSendMessage";

const useAccount = () => {
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();
  const { token } = useAuthentication();

  const { data, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: () => getAccount(token?.id as string),
  });


  const deleteMutation = useMutation({
    mutationFn: (id:string) => deleteAccount(id),

    onSuccess: (response) => {
      sendMessage("success", response.message);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error) => {
      sendMessage("error", error.message);
    }
  });
  return {
    data,
    isLoading,
    deleteMutation,
  };
};
export default useAccount;
