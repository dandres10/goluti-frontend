import { useEffect } from "react";
import { AppDispatch, useAppDispatch } from "@/platform/core/config/redux";
import { InjectionReduxFacade } from "@/platform/facade/redux";
import { IPlatformReduxDTO } from "@/platform/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";

//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const PlatformEvents = () => {
  //datos
  const dispatch: AppDispatch = useAppDispatch();
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

export default PlatformEvents;
