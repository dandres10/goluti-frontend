import { LocationFacade } from "@bus/facade/apis/platform/entities/location-facade";

export class InjectionPlatformEntitiesFacade {
    public static LocationFacade() { return LocationFacade.getInstance(); }
}


