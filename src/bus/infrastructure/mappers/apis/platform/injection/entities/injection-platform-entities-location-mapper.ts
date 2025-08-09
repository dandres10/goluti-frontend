import {
  LocationDeleteMapper,
  LocationReadMapper,
  LocationSaveMapper,
  LocationUpdateMapper,
  LocationEntityMapper,
} from "@bus/infrastructure/mappers/apis/platform/entities/location";

export class InjectionPlatformEntitiesLocationMapper {
  public static LocationReadMapper() { return LocationReadMapper.getInstance(); }
  public static LocationSaveMapper() { return LocationSaveMapper.getInstance(); }
  public static LocationUpdateMapper() { return LocationUpdateMapper.getInstance(); }
  public static LocationDeleteMapper() { return LocationDeleteMapper.getInstance(); }
  public static LocationEntityMapper() { return LocationEntityMapper.getInstance(); }
}


