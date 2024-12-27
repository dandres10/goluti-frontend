import { Mapper } from "../../../../../../../core/classes";
import { IAuthLoginRequestDTO } from "../../../../../../../domain/models/apis/platform/business/auth/login";
import { IAuthLoginRequestEntity } from "../../../../../../entities/apis/platform/business/auth/login";

export class AuthLoginRequestMapper extends Mapper<IAuthLoginRequestEntity, IAuthLoginRequestDTO> {

    private static instance: AuthLoginRequestMapper;
    public constructor() { super(); }


    public static getInstance(): AuthLoginRequestMapper {
        if (!AuthLoginRequestMapper.instance)
            AuthLoginRequestMapper.instance = new AuthLoginRequestMapper();
        return AuthLoginRequestMapper.instance;
    }

    public mapFrom(param: IAuthLoginRequestEntity): IAuthLoginRequestDTO {
        return {
            email: param.email,
            password: param.password
        }
    }

    public mapFromList(params: IAuthLoginRequestEntity[]): IAuthLoginRequestDTO[] {
        return params.map((param: IAuthLoginRequestEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginRequestDTO): IAuthLoginRequestEntity {
        return {
            email: param.email,
            password: param.password
        }
    }

    public mapToList(params: IAuthLoginRequestDTO[]): IAuthLoginRequestEntity[] {
        return params.map((param: IAuthLoginRequestDTO) => {
            return this.mapTo(param);
        })
    }

}