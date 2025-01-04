import { LoginView } from "./login-view";

import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";
import { InjectionPlatformBusinessFacade } from "@/bus/facade/apis/platform/injection/business/injection-platform-business-facade";
import { IAuthLoginRequestDTO } from "@/appointment/domain/models/apis/platform/business/auth/login";
import { useNavigate } from "react-router-dom";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { NAVBAR_TYPE } from "@/bus/shared/enums";

export interface ILoginLogicProps {
  login: (param: IAuthLoginRequestDTO) => void;
  handleContinue: () => void;
}

//api
const _authFacade = InjectionPlatformBusinessFacade.AuthFacade();
const _uIEventFacade = InjectionEventFacade.UiEventFacade();
//session
const _injectionSessionFacade = InjectionSessionFacade.PlatformSessionFacade();

export const LoginLogic = () => {
  const navigate = useNavigate();

  const login = async (param: IAuthLoginRequestDTO) => {
    await _authFacade
      .login({ email: param.email, password: param.password })
      .then((res: IAuthLoginResponseDTO | null) => {
        if (res) {
          _injectionSessionFacade.savePlatform(res);
          handleContinue();
        }
      });
  };

  const handleContinue = () => {
    /* navigate("/appointment/home"); */
    /* navigate("/commercial/voice"); */
    _uIEventFacade.dispatchUpdateNavbarEvent({
      typeNavbar: NAVBAR_TYPE.PLATFORM,
    });
    navigate("/platform/home");
  };

  const props: ILoginLogicProps = {
    login,
    handleContinue,
  };

  return <LoginView {...props} />;
};

export default LoginLogic;
