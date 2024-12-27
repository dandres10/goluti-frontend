import { Mapper } from "../../../../../core/classes";
import { IUserReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IUserLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";



export class UserReduxMapper extends Mapper<IUserLoginResponseDTO,  IUserReduxDTO> {

    private static instance: UserReduxMapper;
    public constructor() { super(); }


    public static getInstance(): UserReduxMapper {
        if (!UserReduxMapper.instance)
            UserReduxMapper.instance = new UserReduxMapper();
        return UserReduxMapper.instance;
    }

    public mapFrom(param: IUserLoginResponseDTO): IUserReduxDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.firstName,
            lastName: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapFromList(params: IUserLoginResponseDTO[]): IUserReduxDTO[] {
        return params.map((param: IUserLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IUserReduxDTO): IUserLoginResponseDTO {
        return {
            id: param.id,
            email: param.email,
            firstName: param.firstName,
            lastName: param.lastName,
            phone: param.phone,
            state: param.state
        }
    }

    public mapToList(params: IUserReduxDTO[]): IUserLoginResponseDTO[] {
        return params.map((param: IUserReduxDTO) => {
            return this.mapTo(param);
        })
    }

}