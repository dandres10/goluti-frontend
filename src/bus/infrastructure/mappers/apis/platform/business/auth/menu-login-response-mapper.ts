import { Mapper } from "@/bus/core/classes";
import { IMenuLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IMenuLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";


export class MenuLoginResponseMapper extends Mapper<IMenuLoginResponseEntity, IMenuLoginResponseDTO> {

    private static instance: MenuLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): MenuLoginResponseMapper {
        if (!MenuLoginResponseMapper.instance)
            MenuLoginResponseMapper.instance = new MenuLoginResponseMapper();
        return MenuLoginResponseMapper.instance;
    }

    mapFrom(param: IMenuLoginResponseEntity): IMenuLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            label: param.label,
            description: param.description,
            topId: param.top_id,
            route: param.route,
            state: param.state,
            icon: param.icon
        }
    }

    mapFromList(params: IMenuLoginResponseEntity[]): IMenuLoginResponseDTO[] {
        return params.map((param: IMenuLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IMenuLoginResponseDTO): IMenuLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            label: param.label,
            description: param.description,
            top_id: param.topId,
            route: param.route,
            state: param.state,
            icon: param.icon
        }
    }

    mapToList(params: IMenuLoginResponseDTO[]): IMenuLoginResponseEntity[] {
        return params.map((param: IMenuLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}