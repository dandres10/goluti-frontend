import { Mapper } from "@/bus/core/classes";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/platform";
import { InjectionPlatformReduxMapper } from "../injection";




export class PlatformReduxMapper extends Mapper<IAuthLoginResponseDTO, IPlatformReduxDTO> {

    private static instance: PlatformReduxMapper;
    private platformConfigurationResponseMapper = InjectionPlatformReduxMapper.ConfigurationReduxMapper()
    private platformVariationsResponseMapper = InjectionPlatformReduxMapper.VariationsReduxMapper()
    public constructor() { super(); }


    public static getInstance(): PlatformReduxMapper {
        if (!PlatformReduxMapper.instance)
            PlatformReduxMapper.instance = new PlatformReduxMapper();
        return PlatformReduxMapper.instance;
    }

    mapFrom(param: IAuthLoginResponseDTO): IPlatformReduxDTO {
        return {
            configuration: this.platformConfigurationResponseMapper.mapFrom(param.platformConfiguration),
            variations: this.platformVariationsResponseMapper.mapFrom(param.platformVariations),
            token: param.token
        }
    }

    mapFromList(params: IAuthLoginResponseDTO[]): IPlatformReduxDTO[] {
        return params.map((param: IAuthLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IPlatformReduxDTO): IAuthLoginResponseDTO {
        return {
            platformConfiguration: this.platformConfigurationResponseMapper.mapTo(param.configuration),
            platformVariations: this.platformVariationsResponseMapper.mapTo(param.variations),
            token: param.token
        }
    }

    mapToList(params: IPlatformReduxDTO[]): IAuthLoginResponseDTO[] {
        return params.map((param: IPlatformReduxDTO) => {
            return this.mapTo(param);
        })
    }

}