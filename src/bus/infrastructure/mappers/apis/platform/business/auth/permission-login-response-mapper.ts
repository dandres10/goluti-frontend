import { Mapper } from "@/bus/core/classes";
import { IPermissionLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { IPermissionLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";



export class PermissionLoginResponseMapper extends Mapper<IPermissionLoginResponseEntity, IPermissionLoginResponseDTO> {

    private static instance: PermissionLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): PermissionLoginResponseMapper {
        if (!PermissionLoginResponseMapper.instance)
            PermissionLoginResponseMapper.instance = new PermissionLoginResponseMapper();
        return PermissionLoginResponseMapper.instance;
    }

    mapFrom(param: IPermissionLoginResponseEntity): IPermissionLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    mapFromList(params: IPermissionLoginResponseEntity[]): IPermissionLoginResponseDTO[] {
        return params.map((param: IPermissionLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IPermissionLoginResponseDTO): IPermissionLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            description: param.description,
            state: param.state
        }
    }

    mapToList(params: IPermissionLoginResponseDTO[]): IPermissionLoginResponseEntity[] {
        return params.map((param: IPermissionLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}