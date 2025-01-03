import { useEffect } from "react";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { NAVBAR_TYPE } from "@/bus/shared/enums";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { store } from "../redux/redux-core";

//event
const _uIEventFacade = InjectionEventFacade.UiEventFacade();
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const BusEvents = () => {
  //datos
  const dispatch = store.dispatch;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();

  useEffect(() => {
    createUpdateNavbarEvent();
    listenerUpdatePlatformEvent();
  }, []);

  const createUpdateNavbarEvent = () => {
    _uIEventFacade.createUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
  };

  const listenerUpdatePlatformEvent = () => {
    _platformEventFacade.listenerUpdatePlatformEvent(
      (message: IPlatformReduxDTO) => {
        _platformReduxFacade.savePlatform(message, { dispatch });
      }
    );
  };

  return null;
};

export default BusEvents;
