import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencyDeleteDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@perry/infrastructure/mappers/apis/perry/injection/entities/injection-perry-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@perry/infrastructure/repositories/apis/perry/repositories/injection/entities/injection-perry-entities-repository";

export class CurrencyDeleteUseCase implements UseCase<ICurrencyDeleteDTO, ICurrencyDTO | null> {
  private static instance: CurrencyDeleteUseCase;
  private repository = InjectionPlatformEntitiesRepository.CurrencyRepository();
  private mapper = InjectionPlatformEntitiesCurrencyMapper.CurrencyDeleteMapper();

  public static getInstance(): CurrencyDeleteUseCase {
    if (!CurrencyDeleteUseCase.instance)
      CurrencyDeleteUseCase.instance = new CurrencyDeleteUseCase();
    return CurrencyDeleteUseCase.instance;
  }

  public async execute(params: ICurrencyDeleteDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.delete(paramsEntity, config).then((data) => data ?? null);
  }
}