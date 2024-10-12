import { Mapper } from "@/bus/core/classes";
import { ILocationReduxDTO } from "@/bus/domain/models/redux/platform";
import { ILocationLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class LocationReduxMapper extends Mapper<ILocationLoginResponseDTO, ILocationReduxDTO> {

    private static instance: LocationReduxMapper;
    public constructor() { super(); }


    public static getInstance(): LocationReduxMapper {
        if (!LocationReduxMapper.instance)
            LocationReduxMapper.instance = new LocationReduxMapper();
        return LocationReduxMapper.instance;
    }

    mapFrom(param: ILocationLoginResponseDTO): ILocationReduxDTO {
        return {
            id: param.id,
            name: param.name,
            address: param.address,
            city: param.city,
            phone: param.phone,
            email: param.email,
            mainLocation: param.mainLocation,
            state: param.state
        }
    }

    mapFromList(params: ILocationLoginResponseDTO[]): ILocationReduxDTO[] {
        return params.map((param: ILocationLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ILocationReduxDTO): ILocationLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            address: param.address,
            city: param.city,
            phone: param.phone,
            email: param.email,
            mainLocation: param.mainLocation,
            state: param.state
        }
    }

    mapToList(params: ILocationReduxDTO[]): ILocationLoginResponseDTO[] {
        return params.map((param: ILocationReduxDTO) => {
            return this.mapTo(param);
        })
    }

}