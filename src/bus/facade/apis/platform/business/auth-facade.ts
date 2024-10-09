import { IConfigRepositoryDTO } from "@/bus/core/interfaces";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { LoginUseCase } from "@/bus/domain/services/use_cases/apis/platform/business/auth/login-use-case";


export class AuthFacade {

    login(params: IAuthLoginRequestDTO, config?: IConfigRepositoryDTO): Promise<IAuthLoginResponseDTO | null> {
        return new LoginUseCase().execute(params, config);
    }

}