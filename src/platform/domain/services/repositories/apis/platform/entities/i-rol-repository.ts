import { IConfigDTO } from "@bus/core/interfaces";
import { IPaginationBackendDTO } from "@bus/core/interfaces/i-pagination-backend-dto";
import { IRolDTO } from "@platform/domain/models/apis/platform/entities/rol";
import {
  IRolDeleteEntity,
  IRolReadEntity,
  IRolSaveEntity,
  IRolUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/rol";

export abstract class IRolRepository {
  abstract read(params: IRolReadEntity, config: IConfigDTO): Promise<IRolDTO | null>;
  abstract save(params: IRolSaveEntity, config: IConfigDTO): Promise<IRolDTO | null>;
  abstract update(params: IRolUpdateEntity, config: IConfigDTO): Promise<IRolDTO | null>;
  abstract delete(params: IRolDeleteEntity, config: IConfigDTO): Promise<IRolDTO | null>;
  abstract list(params: IPaginationBackendDTO, config: IConfigDTO): Promise<IRolDTO[] | null>;
}