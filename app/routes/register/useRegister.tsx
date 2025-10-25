import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Register } from "~/Services/auth.service";
import type { TRegister } from "~/Types/auth";
import useSendMessage from "~/hook/useSendMessage";
import { registerSchema } from "~/schemas/auth";
const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: joiResolver(registerSchema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const { sendMessage } = useSendMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TRegister) => Register(data),
    onSuccess: () => {
      sendMessage("success", "Đăng ký thành công");
      navigate("/login");
    },
    onError: (errors) => {
      sendMessage("error", errors.message);
    },
  });

  const onRegister = (data: TRegister) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onRegister,
    isPending,
  };
};

export default useRegister;
