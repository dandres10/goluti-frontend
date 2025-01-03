import { useEffect } from "react";

import { InjectionReduxFacade } from "@/commercial/facade/redux";
import { IPlatformReduxDTO } from "@/commercial/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { store } from "../redux/redux-core";

//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const CommercialEvents = () => {
  //datos
    const dispatch = store.dispatch;
  //redux
  const _platformReduxFacade = InjectionReduxFacade.PlatformReduxFacade();

  useEffect(() => {
    listenerUpdatePlatformEvent();
  }, []);

  const listenerUpdatePlatformEvent = () => {
    _platformEventFacade.listenerUpdatePlatformEvent(
      (message: IPlatformReduxDTO) => {
        _platformReduxFacade.updatePlatform(message, { dispatch });
      }
    );
  };

  return null;
};

export default CommercialEvents;
