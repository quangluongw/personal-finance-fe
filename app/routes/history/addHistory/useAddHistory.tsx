import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addTransaction } from "~/Services/transactions.service";
import type { TransactionForm } from "~/Types/transaction";
import useAuthentication from "~/hook/useAuthentication";
import useSendMessage from "~/hook/useSendMessage";
import { transactionSchema } from "~/schemas/History";

const useAddHistory = (setIsModalOpen: (v: boolean) => void) => {
  const { token } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TransactionForm>({
    resolver: joiResolver(transactionSchema),
  });
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TransactionForm) => addTransaction(data),
    onSuccess: (response) => {
      sendMessage("success", response.message);
      queryClient.invalidateQueries({ queryKey: ["history"] });
      queryClient.invalidateQueries({ queryKey: ["totalhistory"] });
      setIsModalOpen(false);
      reset();
    },
    onError: (errors) => {
      sendMessage("error", errors.message);
    },
  });

  const onLogin = (value: any) => {
    const data = {
      ...value,
      userId: token?.id,
    };
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onLogin,
    isPending,
    control,
  };
};

export default useAddHistory;
