import { UseCase } from "@/bus/core/interfaces/use-case";
import { IConfigDTO } from "@/bus/core/interfaces";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthMapper } from "@/bus/infrastructure/mappers/apis/platform/injection/business/injection-platform-business-auth-mapper";
import { InjectionPlatformBusinessRepository } from "@/bus/infrastructure/repositories/apis/platform/repositories/injection/injection-platform-business-repository";


export class LoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null> {

    private static instance: LoginUseCase;
    private authRepository = InjectionPlatformBusinessRepository.AuthRepository();
    private authLoginRequestMapper = InjectionPlatformBusinessAuthMapper.AuthLoginRequestMapper();

    public static getInstance(): LoginUseCase {
        if (!LoginUseCase.instance)
            LoginUseCase.instance = new LoginUseCase();
        return LoginUseCase.instance;
    }

    public async execute(
        params: IAuthLoginRequestDTO,
        config?: IConfigDTO
    ): Promise<IAuthLoginResponseDTO | null> {
        const paramsEntity = this.authLoginRequestMapper.mapTo(params)
        return await this.authRepository
            .login(paramsEntity, config)
            .then((data: IAuthLoginResponseDTO | null) => {
                if (data)
                    return data;
                return null;
            })
    }
}