import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencyReadDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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