import { IConfigDTO } from "../../../../core/interfaces";
import { IRefreshTokenResponseDTO } from "../../../../domain/models/apis/platform/business/auth/refresh-token";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "../../../../domain/models/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthUseCase } from "../../../../domain/services/use_cases/apis/platform/injection/business/injection-platform-business-auth-use-case";

export class AuthFacade {

    private static instance: AuthFacade;
    private readonly loginUseCase = InjectionPlatformBusinessAuthUseCase.LoginUseCase();
    private readonly refreshTokenUseCase = InjectionPlatformBusinessAuthUseCase.RefreshTokenUseCase();
    

    public static getInstance(): AuthFacade {
        if (!AuthFacade.instance)
            AuthFacade.instance = new AuthFacade();
        return AuthFacade.instance;
    }

    public async login(params: IAuthLoginRequestDTO, config?: IConfigDTO): Promise<IAuthLoginResponseDTO | null> {
        return await this.loginUseCase.execute(params, config);
    }

    public async refreshToken(config?: IConfigDTO): Promise<IRefreshTokenResponseDTO | null> {
        return await this.refreshTokenUseCase.execute(config);
    }

}