import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { updateSaving } from "~/Services/saving.service";
import type { Isaving } from "~/Types/saving";
import useAuthentication from "~/hook/useAuthentication";
import useSendMessage from "~/hook/useSendMessage";
import { savingSchema } from "~/schemas/Saving";

const useUpdateSaving = () => {
  const { id } = useParams();
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
    mutationFn: (data: Isaving) => updateSaving(id, data),
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

export default useUpdateSaving;
