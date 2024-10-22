
import { useEffect } from "react";
import {
  AppDispatch,
  useAppDispatch,
} from "@/appointment/core/config/redux";
import { InjectionReduxFacade } from "@/appointment/facade/redux";
import { IPlatformReduxDTO } from "@/appointment/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";


//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const AppointmentEvents = () => {
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
        console.log('evento appointment',message)
        console.log('evento appointment',dispatch)
        _platformReduxFacade.savePlatform(message, { dispatch });
      }
    );
  };

  return null
};

export default AppointmentEvents;
