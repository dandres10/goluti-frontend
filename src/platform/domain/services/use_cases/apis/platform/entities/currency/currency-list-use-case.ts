import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";

export class CurrencyListUseCase implements UseCase<IPaginationBackendDTO, ICurrencyDTO[] | null> {
  private static instance: CurrencyListUseCase;
  private repository = InjectionPlatformEntitiesRepository.CurrencyRepository();

  public static getInstance(): CurrencyListUseCase {
    if (!CurrencyListUseCase.instance)
      CurrencyListUseCase.instance = new CurrencyListUseCase();
    return CurrencyListUseCase.instance;
  }

  public async execute(params: IPaginationBackendDTO, config?: IConfigDTO): Promise<ICurrencyDTO[] | null> {
    return await this.repository.list(params, config).then((data) => data ?? null);
  }
}