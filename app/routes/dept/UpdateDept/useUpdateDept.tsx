import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateDept } from "~/Services/dept.service";
import type { IDeptForm } from "~/Types/dept";
import useAuthentication from "~/hook/useAuthentication";
import useSendMessage from "~/hook/useSendMessage";
import { deptUpdateSchema } from "~/schemas/Dept";

const useUpdateDept = () => {
  const { token } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDeptForm>({
    resolver: joiResolver(deptUpdateSchema),
  });
  const queryClient = useQueryClient();
  const { sendMessage } = useSendMessage();
  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IDeptForm }) =>
      updateDept(id, data),
    onSuccess: (response) => {
      sendMessage("success", response.message);
      queryClient.invalidateQueries({ queryKey: ["dept"] });
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
    reset
  };
};

export default useUpdateDept;
