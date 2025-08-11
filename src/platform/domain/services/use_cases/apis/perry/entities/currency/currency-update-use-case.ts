import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencyUpdateDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@perry/infrastructure/mappers/apis/perry/injection/entities/injection-perry-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@perry/infrastructure/repositories/apis/perry/repositories/injection/entities/injection-perry-entities-repository";

export class CurrencyUpdateUseCase implements UseCase<ICurrencyUpdateDTO, ICurrencyDTO | null> {
  private static instance: CurrencyUpdateUseCase;
  private repository = InjectionPlatformEntitiesRepository.CurrencyRepository();
  private mapper = InjectionPlatformEntitiesCurrencyMapper.CurrencyUpdateMapper();

  public static getInstance(): CurrencyUpdateUseCase {
    if (!CurrencyUpdateUseCase.instance)
      CurrencyUpdateUseCase.instance = new CurrencyUpdateUseCase();
    return CurrencyUpdateUseCase.instance;
  }

  public async execute(params: ICurrencyUpdateDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.update(paramsEntity, config).then((data) => data ?? null);
  }
}