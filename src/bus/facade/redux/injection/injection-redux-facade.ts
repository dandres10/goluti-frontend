import { PlatformReduxFacade } from "@bus/facade/redux/bus/platform-redux-facade";
export class InjectionReduxFacade {
    public static PlatformReduxFacade() { return PlatformReduxFacade.getInstance() }
}