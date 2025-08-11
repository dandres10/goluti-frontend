import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO, ICurrencyDeleteDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { InjectionPlatformEntitiesCurrencyMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-currency-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

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