import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolDTO, IRolReadDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { InjectionPlatformEntitiesRolMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolReadUseCase implements UseCase<IRolReadDTO, IRolDTO | null> {
  private static instance: RolReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolRepository();
  private mapper = InjectionPlatformEntitiesRolMapper.RolReadMapper();

  public static getInstance(): RolReadUseCase {
    if (!RolReadUseCase.instance)
      RolReadUseCase.instance = new RolReadUseCase();
    return RolReadUseCase.instance;
  }

  public async execute(params: IRolReadDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}