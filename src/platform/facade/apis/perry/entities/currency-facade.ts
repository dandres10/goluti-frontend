import { IConfigDTO } from "@bus/core/interfaces";
import {
  ICurrencyDTO,
  ICurrencyDeleteDTO,
  ICurrencyReadDTO,
  ICurrencySaveDTO,
  ICurrencyUpdateDTO,
} from "@perry/domain/models/apis/perry/entities/currency";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesCurrencyUseCase } from "@perry/domain/services/use_cases/apis/perry/injection/entities/injection-perry-entities-currency-use-case";

export class CurrencyFacade {
  private static instance: CurrencyFacade;

  private readonly readUseCase = InjectionPlatformEntitiesCurrencyUseCase.CurrencyReadUseCase();
  private readonly saveUseCase = InjectionPlatformEntitiesCurrencyUseCase.CurrencySaveUseCase();
  private readonly updateUseCase = InjectionPlatformEntitiesCurrencyUseCase.CurrencyUpdateUseCase();
  private readonly deleteUseCase = InjectionPlatformEntitiesCurrencyUseCase.CurrencyDeleteUseCase();
  private readonly listUseCase = InjectionPlatformEntitiesCurrencyUseCase.CurrencyListUseCase();

  public static getInstance(): CurrencyFacade {
    if (!CurrencyFacade.instance)
      CurrencyFacade.instance = new CurrencyFacade();
    return CurrencyFacade.instance;
  }

  public async read(params: ICurrencyReadDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    return await this.readUseCase.execute(params, config);
  }

  public async save(params: ICurrencySaveDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }

  public async update(params: ICurrencyUpdateDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    return await this.updateUseCase.execute(params, config);
  }

  public async delete(params: ICurrencyDeleteDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    return await this.deleteUseCase.execute(params, config);
  }

  public async list(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICurrencyDTO[] | null> {
    return await this.listUseCase.execute(params, config);
  }
}