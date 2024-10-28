import { PlatformSessionFacade } from "../platform-session-facade";
import { UiSessionFacade } from "../ui-session-facade";

export class InjectionSessionFacade {
    public static PlatformSessionFacade() { return PlatformSessionFacade.getInstance() }
    public static UiSessionFacade() { return UiSessionFacade.getInstance() }
}