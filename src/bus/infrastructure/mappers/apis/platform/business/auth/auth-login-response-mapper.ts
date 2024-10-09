import { Mapper } from "@/bus/core/classes";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { IAuthLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";
import { InjectionAuthMapper } from "../injection/injection-auth-mapper";




export class AuthLoginResponseMapper extends Mapper<IAuthLoginResponseEntity, IAuthLoginResponseDTO> {

    private static instance: AuthLoginResponseMapper;
    private platformConfigurationResponseMapper = InjectionAuthMapper.InjectionPlatformConfigurationResponseMapper()
    private platformVariationsResponseMapper = InjectionAuthMapper.InjectionPlatformVariationsResponseMapper()
    public constructor() { super(); }


    public static getInstance(): AuthLoginResponseMapper {
        if (!AuthLoginResponseMapper.instance)
            AuthLoginResponseMapper.instance = new AuthLoginResponseMapper();
        return AuthLoginResponseMapper.instance;
    }

    mapFrom(param: IAuthLoginResponseEntity): IAuthLoginResponseDTO {
        return {
            platformConfiguration: this.platformConfigurationResponseMapper.mapFrom(param.platform_configuration),
            platformVariations: this.platformVariationsResponseMapper.mapFrom(param.platform_variations),
            token: param.token
        }
    }

    mapFromList(params: IAuthLoginResponseEntity[]): IAuthLoginResponseDTO[] {
        return params.map((param: IAuthLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IAuthLoginResponseDTO): IAuthLoginResponseEntity {
        return {
            platform_configuration: this.platformConfigurationResponseMapper.mapTo(param.platformConfiguration),
            platform_variations: this.platformVariationsResponseMapper.mapTo(param.platformVariations),
            token: param.token
        }
    }

    mapToList(params: IAuthLoginResponseDTO[]): IAuthLoginResponseEntity[] {
        return params.map((param: IAuthLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}