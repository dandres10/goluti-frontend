import { PlatformReduxFacade } from "../platform-redux-facade";

export class InjectionReduxFacade {
    public static PlatformReduxFacade() { return PlatformReduxFacade.getInstance() }
}