import { UiEventFacade } from "../ui-event-facade";
import { PlatformEventFacade } from "../platform-event-facade";

export class InjectionEventFacade {
    public static PlatformEventFacade() { return PlatformEventFacade.getInstance() }
    public static UiEventFacade() { return UiEventFacade.getInstance() }
}