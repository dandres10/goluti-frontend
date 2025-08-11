import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencyUpdateDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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