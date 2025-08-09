import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationDTO, ILocationSaveDTO } from "@bus/domain/models/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@bus/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";
import { InjectionPlatformEntitiesRepository } from "@bus/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LocationSaveUseCase implements UseCase<ILocationSaveDTO, ILocationDTO | null> {
  private static instance: LocationSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.LocationRepository();
  private mapper = InjectionPlatformEntitiesLocationMapper.LocationSaveMapper();

  public static getInstance(): LocationSaveUseCase {
    if (!LocationSaveUseCase.instance)
      LocationSaveUseCase.instance = new LocationSaveUseCase();
    return LocationSaveUseCase.instance;
  }

  public async execute(params: ILocationSaveDTO, config?: IConfigDTO): Promise<ILocationDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}


