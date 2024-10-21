import { useEffect } from "react";
import { LoginView } from "./login-view";
import { AppDispatch } from "@/bus/core/config/redux/store";
import { KEYS_SESSION } from "@/bus/core/const/keys-session";
import { SelectorBusRedux } from "@/bus/core/types/selector-bus-redux";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { useAppDispatch, useAppSelector } from "@/bus/core/config/redux/index";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { InjectionReduxFacade } from "@/bus/facade/redux/injection/injection-redux-facade";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";
import { IRefreshTokenResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/refresh-token";
import { ILogoutResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/logout/i-logout-response-dto";

//api
const _authFacade = InjectionPlatformBusinessFacade.AuthFacade();
//session
const _injectionSessionFacade = InjectionSessionFacade.PlatformSessionFacade();
//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const LoginLogic = () => {
  //datos
  const dispatch: AppDispatch = useAppDispatch();
  const selector: SelectorBusRedux = useAppSelector;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const user = _platformReduxFacade.readUser({ selector });

  useEffect(() => {
    login();
    listenerUpdatePlatformEvent();
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
          _injectionSessionFacade.savePlatform(res, {
            key: KEYS_SESSION.PLATFORM,
          });
          setTimeout(() => {
            refreshToken();
          }, 3000);
        }
      });
  };

  const refreshToken = async () => {
    await _authFacade
      .refreshToken()
      .then((res: IRefreshTokenResponseDTO | null) => {
        if (res) {
          console.log("token", res?.token);
          setTimeout(() => {
            logout();
          }, 3000);
        }
      });
  };

  const logout = async () => {
    await _authFacade.logout().then((res: ILogoutResponseDTO | null) => {
      if (res) {
        console.log("message", res?.message);
      }
    });
  };

  const work = async () => {
    if (user) console.log("llego el userselector");
  };

  const llego = (data: any) => {
    console.log("llego el dato ->", data);
  };

  const listenerUpdatePlatformEvent = () => {
    _platformEventFacade.listenerUpdatePlatformEvent(
      (message: IPlatformReduxDTO) => llego(message)
    );
  };

  const props: any = {
    user,
  };

  return LoginView(props);
};

export default LoginLogic;
