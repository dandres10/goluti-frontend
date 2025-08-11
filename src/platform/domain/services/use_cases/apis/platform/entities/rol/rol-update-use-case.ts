import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolDTO, IRolUpdateDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { InjectionPlatformEntitiesRolMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-rol-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class RolUpdateUseCase implements UseCase<IRolUpdateDTO, IRolDTO | null> {
  private static instance: RolUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolRepository();
  private mapper = InjectionPlatformEntitiesRolMapper.RolUpdateMapper();

  public static getInstance(): RolUpdateUseCase {
    if (!RolUpdateUseCase.instance)
      RolUpdateUseCase.instance = new RolUpdateUseCase();
    return RolUpdateUseCase.instance;
  }

  public async execute(params: IRolUpdateDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}