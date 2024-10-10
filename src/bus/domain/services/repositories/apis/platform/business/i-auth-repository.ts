import { IConfigRepositoryDTO } from "@/bus/core/interfaces";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IAuthLoginRequestEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";


export abstract class IAuthRepository {
    abstract login(params: IAuthLoginRequestEntity, config: IConfigRepositoryDTO): Promise<IAuthLoginResponseDTO | null>;
}