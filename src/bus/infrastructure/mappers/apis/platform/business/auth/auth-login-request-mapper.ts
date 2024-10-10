import { Mapper } from "@/bus/core/classes";
import { IAuthLoginRequestDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IAuthLoginRequestEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";



export class AuthLoginRequestMapper extends Mapper<IAuthLoginRequestEntity, IAuthLoginRequestDTO> {

    private static instance: AuthLoginRequestMapper;
    public constructor() { super(); }


    public static getInstance(): AuthLoginRequestMapper {
        if (!AuthLoginRequestMapper.instance)
            AuthLoginRequestMapper.instance = new AuthLoginRequestMapper();
        return AuthLoginRequestMapper.instance;
    }

    mapFrom(param: IAuthLoginRequestEntity): IAuthLoginRequestDTO {
        return {
            email: param.email,
            password: param.password
        }
    }

    mapFromList(params: IAuthLoginRequestEntity[]): IAuthLoginRequestDTO[] {
        return params.map((param: IAuthLoginRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IAuthLoginRequestDTO): IAuthLoginRequestEntity {
        return {
            email: param.email,
            password: param.password
        }
    }

    mapToList(params: IAuthLoginRequestDTO[]): IAuthLoginRequestEntity[] {
        return params.map((param: IAuthLoginRequestDTO) => {
            return this.mapTo(param);
        })
    }

}