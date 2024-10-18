import { IConfigDTO } from "../../../../../../core/interfaces";
import platformAxios from "../../../../../../core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "../../../../../../core/const";
import { CONST_CORE_DTO } from "../../../../../../core/const/const-core";
import { InjectionCore } from "../../../../../../core/injection/injection-core";
import { IAuthLoginResponseDTO } from "../../../../../../domain/models/apis/platform/business/auth/login";
import { IRefreshTokenResponseDTO } from "../../../../../../domain/models/apis/platform/business/auth/refresh-token";
import { IAuthRepository } from "../../../../../../domain/services/repositories/apis/platform/business/i-auth-repository";
import { IRefreshTokenResponseEntity } from "../../../../../../infrastructure/entities/apis/platform/business/auth/refresh-token";
import { IAuthLoginRequestEntity, IAuthLoginResponseEntity } from "../../../../../../infrastructure/entities/apis/platform/business/auth/login";
import { InjectionRefreshTokenMapper } from "../../../../../../infrastructure/mappers/apis/platform/injection/business/injection-refresh-token-mapper";
import { InjectionPlatformBusinessAuthMapper } from "../../../../../../infrastructure/mappers/apis/platform/injection/business/injection-platform-business-auth-mapper";

export class AuthRepository extends IAuthRepository {
    
    private static instance: AuthRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly authLoginResponseMapper = InjectionPlatformBusinessAuthMapper.AuthLoginResponseMapper();
    private readonly refreshTokenResponseMapper = InjectionRefreshTokenMapper.RefreshTokenResponseMapper();

    private constructor() {
        super();
    }

    public static getInstance(): AuthRepository {
        if (!AuthRepository.instance)
            AuthRepository.instance = new AuthRepository();
        return AuthRepository.instance;
    }

    public async login(
        params: IAuthLoginRequestEntity,
        config: IConfigDTO = CONST_CORE_DTO.CONFIG
    ): Promise<IAuthLoginResponseDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.AUTH_LOGIN, params)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IAuthLoginResponseEntity>(data);
                    if (entity)
                        return this.authLoginResponseMapper.mapFrom(entity);
                    return null
                });

        return null
    };

    public async refreshToken(config: IConfigDTO = CONST_CORE_DTO.CONFIG): Promise<IRefreshTokenResponseDTO | null> {
        if (config.loadService)
            return platformAxios
                .post(CONST_PLATFORM_API_ROUTES.AUTH_REFRESH_TOKEN)
                .then(({ data }) => {
                    const entity = this.resolve.ResolveRequest<IRefreshTokenResponseEntity>(data);
                    if (entity)
                        return this.refreshTokenResponseMapper.mapFrom(entity);
                    return null
                });

        return null
    }
}