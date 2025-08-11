import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolDTO, IRolDeleteDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { InjectionPlatformEntitiesRolMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolDeleteUseCase implements UseCase<IRolDeleteDTO, IRolDTO | null> {
  private static instance: RolDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolRepository();
  private mapper = InjectionPlatformEntitiesRolMapper.RolDeleteMapper();

  public static getInstance(): RolDeleteUseCase {
    if (!RolDeleteUseCase.instance)
      RolDeleteUseCase.instance = new RolDeleteUseCase();
    return RolDeleteUseCase.instance;
  }

  public async execute(params: IRolDeleteDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}