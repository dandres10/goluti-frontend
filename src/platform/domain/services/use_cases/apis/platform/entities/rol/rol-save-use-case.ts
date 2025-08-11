import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolDTO, IRolSaveDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { InjectionPlatformEntitiesRolMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolSaveUseCase implements UseCase<IRolSaveDTO, IRolDTO | null> {
  private static instance: RolSaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolRepository();
  private mapper = InjectionPlatformEntitiesRolMapper.RolSaveMapper();

  public static getInstance(): RolSaveUseCase {
    if (!RolSaveUseCase.instance)
      RolSaveUseCase.instance = new RolSaveUseCase();
    return RolSaveUseCase.instance;
  }

  public async execute(params: IRolSaveDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}