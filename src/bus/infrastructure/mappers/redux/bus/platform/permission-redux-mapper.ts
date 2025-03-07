import { Mapper } from "../../../../../core/classes";
import { IPermissionReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IPermissionLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class PermissionReduxMapper extends Mapper<IPermissionLoginResponseDTO, IPermissionReduxDTO> {

    private static instance: PermissionReduxMapper;
    public constructor() { super(); }


    public static getInstance(): PermissionReduxMapper {
        if (!PermissionReduxMapper.instance)
            PermissionReduxMapper.instance = new PermissionReduxMapper();
        return PermissionReduxMapper.instance;
    }

    public mapFrom(param: IPermissionLoginResponseDTO): IPermissionReduxDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IPermissionLoginResponseDTO[]): IPermissionReduxDTO[] {
        return params.map((param: IPermissionLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IPermissionReduxDTO): IPermissionLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IPermissionReduxDTO[]): IPermissionLoginResponseDTO[] {
        return params.map((param: IPermissionReduxDTO) => {
            return this.mapTo(param);
        })
    }

}