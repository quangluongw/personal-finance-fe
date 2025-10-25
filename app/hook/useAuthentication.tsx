import { useState } from "react";
import { authToken, checkTokenValid, decodeToken } from "~/lib/auth";

type TJwtDecodedPayload = {
  id: string;
};
const useAuthentication = () => {
  const [token, setToken] = useState<TJwtDecodedPayload | null>(() => {
    const access = authToken.getAccessToken();
    if (!access || !checkTokenValid(access)) return null;
    return decodeToken(access) as TJwtDecodedPayload;
  });

  const syncTokenFromStorage = () => {
    const access = authToken.getAccessToken();
    if (!access || !checkTokenValid(access)) return setToken(null);
    setToken(decodeToken(access) as TJwtDecodedPayload);
  };

  const startSession = (access: string) => {
    authToken.setAccessToken(access);
    syncTokenFromStorage();
  };

  return {
    startSession,
    token,
  };
};
export default useAuthentication;
