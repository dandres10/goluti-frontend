import { Mapper } from "@/bus/core/classes";
import { IPermissionReduxDTO } from "@/bus/domain/models/redux/platform";
import { IPermissionLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class PermissionReduxMapper extends Mapper<IPermissionLoginResponseDTO, IPermissionReduxDTO> {

    private static instance: PermissionReduxMapper;
    public constructor() { super(); }


    public static getInstance(): PermissionReduxMapper {
        if (!PermissionReduxMapper.instance)
            PermissionReduxMapper.instance = new PermissionReduxMapper();
        return PermissionReduxMapper.instance;
    }

    mapFrom(param: IPermissionLoginResponseDTO): IPermissionReduxDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    mapFromList(params: IPermissionLoginResponseDTO[]): IPermissionReduxDTO[] {
        return params.map((param: IPermissionLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IPermissionReduxDTO): IPermissionLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    mapToList(params: IPermissionReduxDTO[]): IPermissionLoginResponseDTO[] {
        return params.map((param: IPermissionReduxDTO) => {
            return this.mapTo(param);
        })
    }

}