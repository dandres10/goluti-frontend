import { LocationRepository } from "../../entities/location/location-repository";
import { PlatformRepository } from "../../entities/platform/platform-repository";
export class InjectionPlatformEntitiesRepository {
  public static LocationRepository() { return LocationRepository.getInstance(); }  public static PlatformRepository() { return PlatformRepository.getInstance(); }
}


