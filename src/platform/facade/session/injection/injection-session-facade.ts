import { PlatformSessionFacade } from "../platform-session-facade";

export class InjectionSessionFacade {
    public static PlatformSessionFacade() { return PlatformSessionFacade.getInstance() }
}