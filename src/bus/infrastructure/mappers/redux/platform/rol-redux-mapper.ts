import { Mapper } from "@/bus/core/classes";
import { IRolReduxDTO } from "@/bus/domain/models/redux/platform";
import { IRolLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class RolReduxMapper extends Mapper<IRolLoginResponseDTO, IRolReduxDTO> {

    private static instance: RolReduxMapper;
    public constructor() { super(); }


    public static getInstance(): RolReduxMapper {
        if (!RolReduxMapper.instance)
            RolReduxMapper.instance = new RolReduxMapper();
        return RolReduxMapper.instance;
    }

    mapFrom(param: IRolLoginResponseDTO): IRolReduxDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    mapFromList(params: IRolLoginResponseDTO[]): IRolReduxDTO[] {
        return params.map((param: IRolLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IRolReduxDTO): IRolLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    mapToList(params: IRolReduxDTO[]): IRolLoginResponseDTO[] {
        return params.map((param: IRolReduxDTO) => {
            return this.mapTo(param);
        })
    }

}