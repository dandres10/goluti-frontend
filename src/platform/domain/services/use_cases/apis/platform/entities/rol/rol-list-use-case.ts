import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class RolListUseCase implements UseCase<IPaginationBackendDTO, IRolDTO[] | null> {
  private static instance: RolListUseCase;
  private repository = InjectionPlatformEntitiesRepository.RolRepository();

  public static getInstance(): RolListUseCase {
    if (!RolListUseCase.instance)
      RolListUseCase.instance = new RolListUseCase();
    return RolListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IRolDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}