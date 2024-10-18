import { Mapper } from "../../../../../core/classes";
import { ILocationReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { ILocationLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class LocationReduxMapper extends Mapper<ILocationLoginResponseDTO, ILocationReduxDTO> {

    private static instance: LocationReduxMapper;
    public constructor() { super(); }


    public static getInstance(): LocationReduxMapper {
        if (!LocationReduxMapper.instance)
            LocationReduxMapper.instance = new LocationReduxMapper();
        return LocationReduxMapper.instance;
    }

    public mapFrom(param: ILocationLoginResponseDTO): ILocationReduxDTO {
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

    public mapFromList(params: ILocationLoginResponseDTO[]): ILocationReduxDTO[] {
        return params.map((param: ILocationLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ILocationReduxDTO): ILocationLoginResponseDTO {
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

    public mapToList(params: ILocationReduxDTO[]): ILocationLoginResponseDTO[] {
        return params.map((param: ILocationReduxDTO) => {
            return this.mapTo(param);
        })
    }

}