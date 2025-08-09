import {
    LocationDeleteUseCase,
    LocationListUseCase,
    LocationReadUseCase,
    LocationSaveUseCase,
    LocationUpdateUseCase,
} from "@bus/domain/services/use_cases/apis/platform/entities/location";

export class InjectionPlatformEntitiesLocationUseCase {
    public static LocationReadUseCase() { return LocationReadUseCase.getInstance(); }
    public static LocationSaveUseCase() { return LocationSaveUseCase.getInstance(); }
    public static LocationUpdateUseCase() { return LocationUpdateUseCase.getInstance(); }
    public static LocationDeleteUseCase() { return LocationDeleteUseCase.getInstance(); }
    public static LocationListUseCase() { return LocationListUseCase.getInstance(); }
}


