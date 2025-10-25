import { useQuery } from "@tanstack/react-query";
import { getUser } from "~/Services/user.service";
import useAuthentication from "~/hook/useAuthentication";

const useUserInfoAction = () => {
    const { token } = useAuthentication();
    
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token?.id as string),
  });
  return { data };
};

export default useUserInfoAction;
