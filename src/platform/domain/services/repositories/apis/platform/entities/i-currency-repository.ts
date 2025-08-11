import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { ICurrencyDTO } from "@platform/domain/models/apis/platform/entities/currency";
import {
  ICurrencyDeleteEntity,
  ICurrencyReadEntity,
  ICurrencySaveEntity,
  ICurrencyUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/currency";

export abstract class ICurrencyRepository {
  abstract read(params: ICurrencyReadEntity, config: IConfigDTO): Promise<ICurrencyDTO | null>;
  abstract save(params: ICurrencySaveEntity, config: IConfigDTO): Promise<ICurrencyDTO | null>;
  abstract update(params: ICurrencyUpdateEntity, config: IConfigDTO): Promise<ICurrencyDTO | null>;
  abstract delete(params: ICurrencyDeleteEntity, config: IConfigDTO): Promise<ICurrencyDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<ICurrencyDTO[] | null>;
}