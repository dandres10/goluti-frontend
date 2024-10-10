import { Mapper } from "@/bus/core/classes";
import { IUserLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IUserLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";



export class UserLoginResponseMapper extends Mapper<IUserLoginResponseEntity, IUserLoginResponseDTO> {

    private static instance: UserLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): UserLoginResponseMapper {
        if (!UserLoginResponseMapper.instance)
            UserLoginResponseMapper.instance = new UserLoginResponseMapper();
        return UserLoginResponseMapper.instance;
    }

    mapFrom(param: IUserLoginResponseEntity): IUserLoginResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.first_name,
            lastName: param.last_name,
            phone: param.phone,
            state: param.state
        }
    }

    mapFromList(params: IUserLoginResponseEntity[]): IUserLoginResponseDTO[] {
        return params.map((param: IUserLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IUserLoginResponseDTO): IUserLoginResponseEntity {
        return {
            id: param.id,
            email: param.email,
            first_name: param.firstName,
            last_name: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    mapToList(params: IUserLoginResponseDTO[]): IUserLoginResponseEntity[] {
        return params.map((param: IUserLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}