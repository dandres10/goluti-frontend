import { PlatformEventFacade } from "../platform-event-facade";

export class InjectionEventFacade {
    public static PlatformEventFacade() { return PlatformEventFacade.getInstance() }
}