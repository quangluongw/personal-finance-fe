import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addSaving } from "~/Services/saving.service";
import type { Isaving } from "~/Types/saving";
import useAuthentication from "~/hook/useAuthentication";
import useSendMessage from "~/hook/useSendMessage";
import { savingSchema } from "~/schemas/Saving";

const useAddSaving = () => {
  const { token } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Isaving>({
    resolver: joiResolver(savingSchema),
  });
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();
  const { mutate } = useMutation({
    mutationFn: (data: Isaving) => addSaving(data),
    onSuccess: (response) => {
      sendMessage("success", response.message);
      queryClient.invalidateQueries({ queryKey: ["saving"] });
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
  };
};

export default useAddSaving;
