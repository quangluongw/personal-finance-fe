import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Login } from "~/Services/auth.service";
import type { TLogin } from "~/Types/auth";
import useSendMessage from "~/hook/useSendMessage";
import { loginSchema } from "~/schemas/auth";
const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: joiResolver(loginSchema)
  });
  const navigate = useNavigate();
  const { sendMessage } = useSendMessage();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: TLogin) => Login(data),
    onSuccess: (response) => {
      sendMessage("success", "Đăng nhập thành công");
      navigate("/");    
      sessionStorage.setItem("token", response.token);
    },
    onError: (errors) => {
      sendMessage("error", errors.message);
    },
  });

  const onLogin = (data: TLogin) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onLogin,
    isPending,
  };
};

export default useLogin;
