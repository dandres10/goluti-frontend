import { Mapper } from "@/bus/core/classes";
import { IMenuReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { IMenuLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class MenuReduxMapper extends Mapper<IMenuLoginResponseDTO, IMenuReduxDTO> {

    private static instance: MenuReduxMapper;
    public constructor() { super(); }


    public static getInstance(): MenuReduxMapper {
        if (!MenuReduxMapper.instance)
            MenuReduxMapper.instance = new MenuReduxMapper();
        return MenuReduxMapper.instance;
    }

    mapFrom(param: IMenuLoginResponseDTO): IMenuReduxDTO {
        return {
            id: param.id,
            name: param.name,
            label: param.label,
            description: param.description,
            topId: param.topId,
            route: param.route,
            state: param.state,
            icon: param.icon
        }
    }

    mapFromList(params: IMenuLoginResponseDTO[]): IMenuReduxDTO[] {
        return params.map((param: IMenuLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IMenuReduxDTO): IMenuLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            label: param.label,
            description: param.description,
            topId: param.topId,
            route: param.route,
            state: param.state,
            icon: param.icon
        }
    }

    mapToList(params: IMenuReduxDTO[]): IMenuLoginResponseDTO[] {
        return params.map((param: IMenuReduxDTO) => {
            return this.mapTo(param);
        })
    }

}