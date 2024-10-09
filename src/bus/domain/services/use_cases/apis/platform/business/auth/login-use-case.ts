import { IConfigRepositoryDTO } from "@/bus/core/interfaces";
import { UseCase } from "@/bus/core/interfaces/use-case";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { IAuthRepository } from "@/bus/domain/services/repositories/apis/platform/business/i-auth-repository";
import { InjectionAuthMapper } from "@/bus/infrastructure/mappers/apis/platform/business/injection/injection-auth-mapper";
import { AuthRepository } from "@/bus/infrastructure/repositories/apis/platform/repositories/business/auth-repository";


export class LoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null> {

    private authRepository: IAuthRepository = AuthRepository.getInstance();
    private authLoginRequestMapper = InjectionAuthMapper.InjectionAuthLoginRequestMapper();

    async execute(
        params: IAuthLoginRequestDTO,
        config: IConfigRepositoryDTO = { loadService: true }
    ): Promise<IAuthLoginResponseDTO | null> {
        const paramsEntity = this.authLoginRequestMapper.mapTo(params)
        return await this.authRepository.login(paramsEntity, config).then((data: IAuthLoginResponseDTO | null) => {

            if (data)
                return data;
            return null;

        })


    }
}