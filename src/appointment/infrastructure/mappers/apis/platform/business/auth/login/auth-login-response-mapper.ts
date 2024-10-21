import { Mapper } from "../../../../../../../core/classes";
import { IAuthLoginResponseDTO } from "../../../../../../../domain/models/apis/platform/business/auth/login";
import { IAuthLoginResponseEntity } from "../../../../../../../infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthMapper } from "../../../injection/business/injection-platform-business-auth-mapper";

export class AuthLoginResponseMapper extends Mapper<IAuthLoginResponseEntity, IAuthLoginResponseDTO> {

    private static instance: AuthLoginResponseMapper;
    private platformConfigurationResponseMapper = InjectionPlatformBusinessAuthMapper.PlatformConfigurationResponseMapper()
    private platformVariationsResponseMapper = InjectionPlatformBusinessAuthMapper.PlatformVariationsResponseMapper()
    public constructor() { super(); }


    public static getInstance(): AuthLoginResponseMapper {
        if (!AuthLoginResponseMapper.instance)
            AuthLoginResponseMapper.instance = new AuthLoginResponseMapper();
        return AuthLoginResponseMapper.instance;
    }

    public mapFrom(param: IAuthLoginResponseEntity): IAuthLoginResponseDTO {
        return {
            platformConfiguration: this.platformConfigurationResponseMapper.mapFrom(param.platform_configuration),
            platformVariations: this.platformVariationsResponseMapper.mapFrom(param.platform_variations),
            token: param.token
        }
    }

    public mapFromList(params: IAuthLoginResponseEntity[]): IAuthLoginResponseDTO[] {
        return params.map((param: IAuthLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IAuthLoginResponseDTO): IAuthLoginResponseEntity {
        return {
            platform_configuration: this.platformConfigurationResponseMapper.mapTo(param.platformConfiguration),
            platform_variations: this.platformVariationsResponseMapper.mapTo(param.platformVariations),
            token: param.token
        }
    }

    public mapToList(params: IAuthLoginResponseDTO[]): IAuthLoginResponseEntity[] {
        return params.map((param: IAuthLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}