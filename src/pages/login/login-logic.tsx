import { useEffect } from "react";
import { LoginView } from "./login-view";
import { AppDispatch } from "@/bus/core/config/redux/store";
import { SelectorBusRedux } from "@/bus/core/types/selector-bus-redux";
import { useAppDispatch, useAppSelector } from "@/bus/core/config/redux/index";
import { InjectionReduxFacade } from "@/bus/facade/redux/injection/injection-redux-facade";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";

const _authFacade = InjectionPlatformBusinessFacade.AuthFacade();

export const LoginLogic = () => {
  //datos
  const dispatch: AppDispatch = useAppDispatch();
  const selector: SelectorBusRedux = useAppSelector;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const user = _platformReduxFacade.readUser({ selector });

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    work();
  }, [user]);

  const login = async () => {
    await _authFacade
      .login({ email: "marlon@goluti.com", password: "admin" })
      .then((res: IAuthLoginResponseDTO | null) => {
        if (res) {
          _platformReduxFacade.savePlatform(res, { dispatch });
        }
      });
  };

  const work = async () => {
    if (user) console.log("llego el dato");
  };

  const props: any = {
    user,
  };

  return LoginView(props);
};

export default LoginLogic;
