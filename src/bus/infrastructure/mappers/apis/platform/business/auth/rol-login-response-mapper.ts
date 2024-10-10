import { Mapper } from "@/bus/core/classes";
import { IRolLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IRolLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";


export class RolLoginResponseMapper extends Mapper<IRolLoginResponseEntity, IRolLoginResponseDTO> {

    private static instance: RolLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): RolLoginResponseMapper {
        if (!RolLoginResponseMapper.instance)
            RolLoginResponseMapper.instance = new RolLoginResponseMapper();
        return RolLoginResponseMapper.instance;
    }

    mapFrom(param: IRolLoginResponseEntity): IRolLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    mapFromList(params: IRolLoginResponseEntity[]): IRolLoginResponseDTO[] {
        return params.map((param: IRolLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IRolLoginResponseDTO): IRolLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    mapToList(params: IRolLoginResponseDTO[]): IRolLoginResponseEntity[] {
        return params.map((param: IRolLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}