import { Mapper } from "../../../../../core/classes";
import { IRolReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IRolLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class RolReduxMapper extends Mapper<IRolLoginResponseDTO, IRolReduxDTO> {

    private static instance: RolReduxMapper;
    public constructor() { super(); }


    public static getInstance(): RolReduxMapper {
        if (!RolReduxMapper.instance)
            RolReduxMapper.instance = new RolReduxMapper();
        return RolReduxMapper.instance;
    }

    public mapFrom(param: IRolLoginResponseDTO): IRolReduxDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapFromList(params: IRolLoginResponseDTO[]): IRolReduxDTO[] {
        return params.map((param: IRolLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IRolReduxDTO): IRolLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            description: param.description,
            state: param.state
        }
    }

    public mapToList(params: IRolReduxDTO[]): IRolLoginResponseDTO[] {
        return params.map((param: IRolReduxDTO) => {
            return this.mapTo(param);
        })
    }

}