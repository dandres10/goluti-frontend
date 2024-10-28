import { useEffect } from "react";
import { useAppSelector } from "@/onboarding/core/config/redux";
import { LoginView } from "./login-view";
import { KEYS_SESSION } from "@/bus/core/const/keys-session";
import { InjectionReduxFacade } from "@/onboarding/facade/redux";
import { SelectorOnboardingRedux } from "@/onboarding/core/types/selector-bus-redux";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";
import { IAuthLoginRequestDTO } from "@/appointment/domain/models/apis/platform/business/auth/login";
import { IUserReduxDTO } from "@/onboarding/domain/models/redux/bus/platform";


export interface ILoginLogicProps {
  user: IUserReduxDTO | undefined
  login: (param: IAuthLoginRequestDTO) => void

}

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
  const user: IUserReduxDTO | undefined = _platformReduxFacade.readUser({ selector });

  useEffect(() => {

  }, []);

  const login = async (param: IAuthLoginRequestDTO) => {
    await _authFacade
      .login({ email: param.email, password: param.password })
      .then((res: IAuthLoginResponseDTO | null) => {
        if (res) {
          _injectionSessionFacade.savePlatform(res, {
            key: KEYS_SESSION.PLATFORM,
          });
        }
      });
  };

  const props: ILoginLogicProps = {
    user,
    login
  };

  return <LoginView {...props} />;
};

export default LoginLogic;
