import { useEffect } from "react";
import { HomeView } from "./home-view";
import { NAVBAR_TYPE } from "@/bus/shared/enums";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";

export interface PropsHomeLogic {
  title: string;
  navbarType: NAVBAR_TYPE;
}

const _uIEventFacade = InjectionEventFacade.UiEventFacade();
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();
const _platformSessionFacade = InjectionSessionFacade.PlatformSessionFacade();

export const HomeLogic = () => {
  const props: PropsHomeLogic = {
    title: "Home + vite + Felizzzzx ",
    navbarType: NAVBAR_TYPE.HOME,
  };

  useEffect(() => {
    _platformSessionFacade.deleteSession();
    _platformEventFacade.dispatchLogoutEvent();
    _uIEventFacade.dispatchUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
  }, []);

  return <HomeView {...props} />;
};

export default HomeLogic;
