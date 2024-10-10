import { IConfigRepositoryDTO } from "@/bus/core/interfaces";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthUseCase } from "@/bus/domain/services/use_cases/apis/platform/injection/business/injection-platform-business-auth-use-case";


export class AuthFacade {

    private static instance: AuthFacade;
    private readonly loginUseCase = InjectionPlatformBusinessAuthUseCase.LoginUseCase();

    public static getInstance(): AuthFacade {
        if (!AuthFacade.instance)
            AuthFacade.instance = new AuthFacade();
        return AuthFacade.instance;
    }

    public async login(params: IAuthLoginRequestDTO, config?: IConfigRepositoryDTO): Promise<IAuthLoginResponseDTO | null> {
        return await this.loginUseCase.execute(params, config);
    }

}