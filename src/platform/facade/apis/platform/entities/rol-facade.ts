import { IConfigDTO } from "@bus/core/interfaces";
import {
  IRolDTO,
  IRolDeleteDTO,
  IRolReadDTO,
  IRolSaveDTO,
  IRolUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/rol";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesRolUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-rol-use-case";

export class RolFacade {
  private static instance: RolFacade;

  private readonly readUseCase = InjectionPlatformEntitiesRolUseCase.RolReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesRolUseCase.RolSaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesRolUseCase.RolUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesRolUseCase.RolDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesRolUseCase.RolListUseCase();

  public static getInstance(): RolFacade {
    if (!RolFacade.instance)
      RolFacade.instance = new RolFacade();
    return RolFacade.instance;
  }

  public async read(params: IRolReadDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: IRolSaveDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: IRolUpdateDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: IRolDeleteDTO, config?: IConfigDTO): Promise<IRolDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<IRolDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}