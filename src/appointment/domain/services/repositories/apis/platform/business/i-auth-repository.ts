import { IConfigDTO } from "../../../../../../core/interfaces";
import { IAuthLoginResponseDTO } from "../../../../../../domain/models/apis/platform/business/auth/login";
import { IRefreshTokenResponseDTO } from "../../../../../../domain/models/apis/platform/business/auth/refresh-token";
import { IAuthLoginRequestEntity } from "../../../../../../infrastructure/entities/apis/platform/business/auth/login";
import { ILogoutResponseDTO } from "../../../../../../domain/models/apis/platform/business/auth/logout/i-logout-response-dto";

export abstract class IAuthRepository {
    abstract login(params: IAuthLoginRequestEntity, config: IConfigDTO): Promise<IAuthLoginResponseDTO | null>;
    abstract refreshToken(config: IConfigDTO): Promise<IRefreshTokenResponseDTO | null>;
    abstract logout(config: IConfigDTO): Promise<ILogoutResponseDTO | null>;
}