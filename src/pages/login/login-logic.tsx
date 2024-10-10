import { useEffect } from "react";
import { LoginView } from "./login-view";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";
import { PlatformReduxFacade } from "@/bus/facade/redux/platform-redux-facade";

const _authFacade = InjectionPlatformBusinessFacade.AuthFacade();


export const LoginLogic = () => {

  const _platformReduxFacade = PlatformReduxFacade.getInstance();



  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    await _authFacade
      .login({ email: "marlon@goluti.com", password: "admin" })
      .then((res: IAuthLoginResponseDTO | null) => {
        console.log(res);
        _platformReduxFacade.savePlatform(res);
      });
  };

  return <LoginView />;
};

export default LoginLogic;
