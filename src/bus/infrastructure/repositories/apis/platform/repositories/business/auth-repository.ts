import platformAxios from "@/bus/core/axios/platform-axios";
import { InjectionCore } from "@/bus/core/injection/injection-core";
import { IConfigRepositoryDTO } from "@/bus/core/interfaces";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { IAuthRepository } from "@/bus/domain/services/repositories/apis/platform/business/i-auth-repository";
import { IAuthLoginRequestEntity, IAuthLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";
import { InjectionAuthMapper } from "@/bus/infrastructure/mappers/apis/platform/business/injection/injection-auth-mapper";


export class AuthRepository extends IAuthRepository {
    private static instance: AuthRepository;
    private resolve = InjectionCore.InjectionResolve();
    private readonly authLoginResponseMapper = InjectionAuthMapper.InjectionAuthLoginResponseMapper();

    private constructor() {
        super();
    }

    public static getInstance(): AuthRepository {
        if (!AuthRepository.instance)
            AuthRepository.instance = new AuthRepository();
        return AuthRepository.instance;
    }

    login = async (
        params: IAuthLoginRequestEntity,
        config: IConfigRepositoryDTO = { loadService: true }
    ): Promise<IAuthLoginResponseDTO | null> => {
        return platformAxios.post(`auth/login`, params).then(({ data }) => {
            const entity = this.resolve.ResolveRequest<IAuthLoginResponseEntity>(data);
            if (entity)
                return this.authLoginResponseMapper.mapFrom(entity);
            return null
        });
    };
}