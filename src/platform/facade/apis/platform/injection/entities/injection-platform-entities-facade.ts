import { LocationFacade } from "@platform/facade/apis/platform/entities/location-facade";
import { PlatformFacade } from "@platform/facade/apis/platform/entities/platform-facade";
export class InjectionPlatformEntitiesFacade {
    public static LocationFacade() { return LocationFacade.getInstance(); }
    public static PlatformFacade() { return PlatformFacade.getInstance(); }
}


