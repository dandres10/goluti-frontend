import { useEffect } from "react";
import { HomeView } from "./home-view";
import { NAVBAR_TYPE } from "@/bus/shared/enums";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";

export interface PropsHomeLogic {
  title: string;
  navbarType: NAVBAR_TYPE;
}

const _uIEventFacade = InjectionEventFacade.UiEventFacade();

export const HomeLogic = () => {
  const props: PropsHomeLogic = {
    title: "Home + vite + Felizzzzx ",
    navbarType: NAVBAR_TYPE.HOME,
  };

  useEffect(() => {
    _uIEventFacade.dispatchUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
  }, []);

  return <HomeView {...props} />;
};

export default HomeLogic;
