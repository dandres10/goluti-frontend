import { useEffect } from "react";
/* import { AppDispatch, useAppDispatch } from "@/appointment/core/config/redux"; */
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { NAVBAR_TYPE } from "@/bus/shared/enums";

//event
const _uIEventFacade = InjectionEventFacade.UiEventFacade();

export const BusEvents = () => {
  //datos
  /* const dispatch: AppDispatch = useAppDispatch(); */
  //redux
  /* const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade(); */

  useEffect(() => {
    createUpdateNavbarEvent();
  }, []);

  const createUpdateNavbarEvent = () => {
    _uIEventFacade.createUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
  };

  return null;
};

export default BusEvents;
