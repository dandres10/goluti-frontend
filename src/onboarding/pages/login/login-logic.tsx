import { useEffect } from "react";
import {
  useAppSelector,
} from "@/onboarding/core/config/redux";
import { LoginView } from "./login-view";
import { KEYS_SESSION } from "@/bus/core/const/keys-session";
import { InjectionReduxFacade } from "@/onboarding/facade/redux";
import { SelectorOnboardingRedux } from "@/onboarding/core/types/selector-bus-redux";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";

//api
const _authFacade = InjectionPlatformBusinessFacade.AuthFacade();
//session
const _injectionSessionFacade = InjectionSessionFacade.PlatformSessionFacade();


export const LoginLogic = () => {
  //datos
  /* const dispatch: AppDispatch = useAppDispatch(); */
  const selector: SelectorOnboardingRedux = useAppSelector;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();
  const user = _platformReduxFacade.readUser({ selector });

  useEffect(() => {
    login();
  }, []);


  const login = async () => {
    await _authFacade
      .login({ email: "marlon@goluti.com", password: "admin" })
      .then((res: IAuthLoginResponseDTO | null) => {
        if (res) {
          _injectionSessionFacade.savePlatform(res, {
            key: KEYS_SESSION.PLATFORM,
          });
        }
      });
  };


  const props: any = {
    user,
  };

  return LoginView(props);
};

export default LoginLogic;
