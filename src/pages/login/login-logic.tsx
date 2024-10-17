import { useEffect } from "react";
import { LoginView } from "./login-view";
import { BUS_EVENTS } from "@/bus/core/const";
import { AppDispatch } from "@/bus/core/config/redux/store";
import { KEYS_SESSION } from "@/bus/core/const/keys-session";
import { SelectorBusRedux } from "@/bus/core/types/selector-bus-redux";
import { useAppDispatch, useAppSelector } from "@/bus/core/config/redux/index";
import { InjectionReduxFacade } from "@/bus/facade/redux/injection/injection-redux-facade";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";

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
    console.log("useEffect");
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
