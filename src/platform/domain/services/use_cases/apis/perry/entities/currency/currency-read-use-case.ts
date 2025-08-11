import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencyReadDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@perry/infrastructure/mappers/apis/perry/injection/entities/injection-perry-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@perry/infrastructure/repositories/apis/perry/repositories/injection/entities/injection-perry-entities-repository";

export class CurrencyReadUseCase implements UseCase<ICurrencyReadDTO, ICurrencyDTO | null> {
  private static instance: CurrencyReadUseCase;
  private repository = InjectionPlatformEntitiesRepository.CurrencyRepository();
  private mapper = InjectionPlatformEntitiesCurrencyMapper.CurrencyReadMapper();

  public static getInstance(): CurrencyReadUseCase {
    if (!CurrencyReadUseCase.instance)
      CurrencyReadUseCase.instance = new CurrencyReadUseCase();
    return CurrencyReadUseCase.instance;
  }

  public async execute(params: ICurrencyReadDTO, config?: IConfigDTO): Promise<ICurrencyDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.read(paramsEntity, config).then((data) => data ?? null);
  }
}