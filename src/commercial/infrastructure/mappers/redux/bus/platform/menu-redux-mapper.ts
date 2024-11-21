import { Mapper } from "../../../../../core/classes";
import { IMenuReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IMenuLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class MenuReduxMapper extends Mapper<IMenuLoginResponseDTO, IMenuReduxDTO> {

    private static instance: MenuReduxMapper;
    public constructor() { super(); }


    public static getInstance(): MenuReduxMapper {
        if (!MenuReduxMapper.instance)
            MenuReduxMapper.instance = new MenuReduxMapper();
        return MenuReduxMapper.instance;
    }

    public mapFrom(param: IMenuLoginResponseDTO): IMenuReduxDTO {
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

    public mapFromList(params: IMenuLoginResponseDTO[]): IMenuReduxDTO[] {
        return params.map((param: IMenuLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IMenuReduxDTO): IMenuLoginResponseDTO {
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

    public mapToList(params: IMenuReduxDTO[]): IMenuLoginResponseDTO[] {
        return params.map((param: IMenuReduxDTO) => {
            return this.mapTo(param);
        })
    }

}