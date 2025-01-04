import { useEffect } from "react";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { NAVBAR_TYPE } from "@/bus/shared/enums";
import { InjectionReduxFacade } from "@/bus/facade/redux";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { store } from "../redux/redux-core";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";

//event
const _uIEventFacade = InjectionEventFacade.UiEventFacade();
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();
const _platformSessionFacade = InjectionSessionFacade.PlatformSessionFacade();

export const BusEvents = () => {
  //datos
  const dispatch = store.dispatch;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();

  useEffect(() => {
    createLogoutEvent();
    createUpdateNavbarEvent();
    listenerUpdatePlatformEvent();
    listenerLogoutEvent();
  }, []);

  const createUpdateNavbarEvent = () => {
    _uIEventFacade.createUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
  };

  const listenerUpdatePlatformEvent = () => {
    const readPlatformSession = _platformSessionFacade.readPlatform();
    if (readPlatformSession) {
      _platformReduxFacade.savePlatform(readPlatformSession, { dispatch });
    }
    _platformEventFacade.listenerUpdatePlatformEvent(
      (message: IPlatformReduxDTO) => {
        _platformReduxFacade.savePlatform(message, { dispatch });
      }
    );
  };

  const createLogoutEvent = () => {
    _platformEventFacade.createLogoutEvent();
  };

  const listenerLogoutEvent = () => {
    _platformEventFacade.listenerLogoutEvent(() => {
      _platformReduxFacade.savePlatform(null, { dispatch });
    });
  };

  return null;
};

export default BusEvents;
