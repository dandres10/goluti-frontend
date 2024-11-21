import { IConfigDTO } from "../../../../../../../core/interfaces";
import { UseCase } from "../../../../../../../core/interfaces/use-case";
import { IRefreshTokenResponseDTO } from "../../../../../../models/apis/platform/business/auth/refresh-token";
import { InjectionPlatformBusinessRepository } from "../../../../../../../infrastructure/repositories/apis/platform/repositories/injection/injection-platform-business-repository";



export class RefreshTokenUseCase implements UseCase<undefined, IRefreshTokenResponseDTO | null> {

    private static instance: RefreshTokenUseCase;
    private authRepository = InjectionPlatformBusinessRepository.AuthRepository();

    public static getInstance(): RefreshTokenUseCase {
        if (!RefreshTokenUseCase.instance)
            RefreshTokenUseCase.instance = new RefreshTokenUseCase();
        return RefreshTokenUseCase.instance;
    }

    public async execute(
        config?: IConfigDTO
    ): Promise<IRefreshTokenResponseDTO | null> {
        return await this.authRepository
            .refreshToken(config)
            .then((data: IRefreshTokenResponseDTO | null) => {
                if (data) {
                    return data;
                }
                return null;
            })
    }
}