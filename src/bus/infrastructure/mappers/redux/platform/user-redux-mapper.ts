import { Mapper } from "@/bus/core/classes";
import { IUserReduxDTO } from "@/bus/domain/models/redux/platform";
import { IUserLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";



export class UserReduxMapper extends Mapper<IUserLoginResponseDTO,  IUserReduxDTO> {

    private static instance: UserReduxMapper;
    public constructor() { super(); }


    public static getInstance(): UserReduxMapper {
        if (!UserReduxMapper.instance)
            UserReduxMapper.instance = new UserReduxMapper();
        return UserReduxMapper.instance;
    }

    mapFrom(param: IUserLoginResponseDTO): IUserReduxDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.firstName,
            lastName: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    mapFromList(params: IUserLoginResponseDTO[]): IUserReduxDTO[] {
        return params.map((param: IUserLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IUserReduxDTO): IUserLoginResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.firstName,
            lastName: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    mapToList(params: IUserReduxDTO[]): IUserLoginResponseDTO[] {
        return params.map((param: IUserReduxDTO) => {
            return this.mapTo(param);
        })
    }

}