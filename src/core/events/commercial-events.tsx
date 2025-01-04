import { useEffect } from "react";

import { InjectionReduxFacade } from "@/commercial/facade/redux";
import { IPlatformReduxDTO } from "@/commercial/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { store } from "../redux/redux-core";
import { InjectionSessionFacade } from "@/bus/facade/session/injection/injection-session-facade";

//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();
const _platformSessionFacade = InjectionSessionFacade.PlatformSessionFacade();

export const CommercialEvents = () => {
  //datos
  const dispatch = store.dispatch;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();

  useEffect(() => {
    listenerUpdatePlatformEvent();
    listenerLogoutEvent();
  }, []);

  const listenerUpdatePlatformEvent = () => {
    const readPlatformSession = _platformSessionFacade.readPlatform();
    if (readPlatformSession) {
      _platformReduxFacade.updatePlatform(readPlatformSession, { dispatch });
    }
    _platformEventFacade.listenerUpdatePlatformEvent(
      (message: IPlatformReduxDTO) => {
        _platformReduxFacade.updatePlatform(message, { dispatch });
      }
    );
  };

  const listenerLogoutEvent = () => {
    _platformEventFacade.listenerLogoutEvent(() => {
      _platformReduxFacade.updatePlatform(null, { dispatch });
    });
  };

  return null;
};

export default CommercialEvents;
