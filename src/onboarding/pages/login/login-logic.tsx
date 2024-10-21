import { KEYS_SESSION } from "@/bus/core/const/keys-session";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/onboarding/core/config/redux";
import { SelectorOnboardingRedux } from "@/onboarding/core/types/selector-bus-redux";
import { IPlatformReduxDTO } from "@/onboarding/domain/models/redux/bus/platform";
import { InjectionReduxFacade } from "@/onboarding/facade/redux";
import { useEffect } from "react";
import { LoginView } from "./login-view";



//api
const _authFacade = InjectionPlatformBusinessFacade.AuthFacade();
//session
const _injectionSessionFacade = InjectionSessionFacade.PlatformSessionFacade();
//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const LoginLogic = () => {
  //datos
  const dispatch: AppDispatch = useAppDispatch();
  const selector: SelectorOnboardingRedux = useAppSelector;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const user = _platformReduxFacade.readUser({ selector });

  useEffect(() => {
    login();
    /* listenerUpdatePlatformEvent(); */
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
