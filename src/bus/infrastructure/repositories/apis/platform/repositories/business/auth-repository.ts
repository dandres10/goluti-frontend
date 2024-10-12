import platformAxios from "@/bus/core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@/bus/core/const";
import { CONST_CORE_DTO } from "@/bus/core/const/const-core";
import { IConfigDTO } from "@/bus/core/interfaces";
import { InjectionCore } from "@/bus/core/injection/injection-core";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IAuthRepository } from "@/bus/domain/services/repositories/apis/platform/business/i-auth-repository";
import { IAuthLoginRequestEntity, IAuthLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthMapper } from "@/bus/infrastructure/mappers/apis/platform/injection/business/injection-platform-business-auth-mapper";


export class AuthRepository extends IAuthRepository {
    private static instance: AuthRepository;
    private readonly resolve = InjectionCore.Resolve();
    private readonly authLoginResponseMapper = InjectionPlatformBusinessAuthMapper.AuthLoginResponseMapper();

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
}