import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencySaveDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@perry/infrastructure/mappers/apis/perry/injection/entities/injection-perry-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@perry/infrastructure/repositories/apis/perry/repositories/injection/entities/injection-perry-entities-repository";

export class CurrencySaveUseCase implements UseCase<ICurrencySaveDTO, ICurrencyDTO | null> {
  private static instance: CurrencySaveUseCase;
  private repository = InjectionPlatformEntitiesRepository.CurrencyRepository();
  private mapper = InjectionPlatformEntitiesCurrencyMapper.CurrencySaveMapper();

  public static getInstance(): CurrencySaveUseCase {
    if (!CurrencySaveUseCase.instance)
      CurrencySaveUseCase.instance = new CurrencySaveUseCase();
    return CurrencySaveUseCase.instance;
  }

  public async execute(params: ICurrencySaveDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}