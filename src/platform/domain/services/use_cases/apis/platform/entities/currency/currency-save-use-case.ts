import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencySaveDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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