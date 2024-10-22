
import { useEffect } from "react";
import {
  AppDispatch,
  useAppDispatch,
} from "@/onboarding/core/config/redux";
import { InjectionReduxFacade } from "@/onboarding/facade/redux";
import { IPlatformReduxDTO } from "@/onboarding/domain/models/redux/bus/platform";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";


//event
const _platformEventFacade = InjectionEventFacade.PlatformEventFacade();

export const OnboardingEvents = () => {
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
        console.log('evento onboarding',message)
        console.log('evento onboarding',dispatch)
        _platformReduxFacade.savePlatform(message, { dispatch });
      }
    );
  };

  return null
};

export default OnboardingEvents;
