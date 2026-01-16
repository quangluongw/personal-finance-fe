import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { updateSaving } from "~/Services/saving.service";
import type { Isaving } from "~/Types/saving";
import useSendMessage from "~/hook/useSendMessage";
import { savingSchema } from "~/schemas/Saving";

const useUpdateSaving = (
  setShowUpdateModal: Dispatch<SetStateAction<boolean>>
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<Isaving>({
    resolver: joiResolver(savingSchema),
  });
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();
  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Isaving }) =>
      updateSaving(id, data),
    onSuccess: (response) => {
      sendMessage("success", response.message);
      setShowUpdateModal(false);
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

    reset,
    getValues,
    setValue,
  };
};

export default useUpdateSaving;
