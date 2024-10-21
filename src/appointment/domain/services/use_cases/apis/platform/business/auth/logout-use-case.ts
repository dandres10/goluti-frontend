import { IConfigDTO } from "../../../../../../../core/interfaces";
import { UseCase } from "../../../../../../../core/interfaces/use-case";
import { ILogoutResponseDTO } from "../../../../../../../domain/models/apis/platform/business/auth/logout/i-logout-response-dto";
import { InjectionPlatformBusinessRepository } from "../../../../../../../infrastructure/repositories/apis/platform/repositories/injection/injection-platform-business-repository";



export class LogoutUseCase implements UseCase<undefined, ILogoutResponseDTO | null> {

    private static instance: LogoutUseCase;
    private authRepository = InjectionPlatformBusinessRepository.AuthRepository();

    public static getInstance(): LogoutUseCase {
        if (!LogoutUseCase.instance)
            LogoutUseCase.instance = new LogoutUseCase();
        return LogoutUseCase.instance;
    }

    public async execute(
        config?: IConfigDTO
    ): Promise<ILogoutResponseDTO | null> {
        return await this.authRepository
            .logout(config)
            .then((data: ILogoutResponseDTO | null) => {
                if (data) {
                    return data;
                }
                return null;
            })
    }
}