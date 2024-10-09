import { AuthFacade } from "@/bus/facade/apis/platform/business/auth-facade";
import { LoginView } from "./login-view";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { useEffect } from "react";

export const LoginLogic = () => {
  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    const authFacade = new AuthFacade();
    await authFacade
      .login({ email: "marlon@goluti.com", password: "admin" })
      .then((res: IAuthLoginResponseDTO | null) => {
        console.log(res);
      });
  };

  return <LoginView />;
};

export default LoginLogic;
