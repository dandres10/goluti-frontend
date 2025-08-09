import { LocationRepository } from "../../entities/location";

export class InjectionPlatformEntitiesRepository {
  public static LocationRepository() { return LocationRepository.getInstance(); }
}


