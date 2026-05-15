import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addAccount } from "~/Services/account.service";
import type { AccountFormValues } from "~/Types/account";
import useAuthentication from "~/hook/useAuthentication";
import useSendMessage from "~/hook/useSendMessage";
import { accountSchema } from "~/schemas/acc";

const useAddAccount = () => {
  const { token } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,

  } = useForm<AccountFormValues>({
    resolver: joiResolver(accountSchema),
  });
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();
  const { mutate } = useMutation({
    mutationFn: (data: AccountFormValues) => addAccount(data),
    onSuccess: (response) => {
      sendMessage("success", response.message);
      queryClient.invalidateQueries({ queryKey: ["account"] });
      reset();
    },
    onError: (errors) => {
      sendMessage("error", errors.message);
    },
  });
  return {
    register,
    handleSubmit,
    errors,
    mutate,
    token,
    reset,
    setValue,
    watch,
  };
};

export default useAddAccount;
