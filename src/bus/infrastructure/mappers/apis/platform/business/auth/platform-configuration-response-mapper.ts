import { Mapper } from "@/bus/core/classes";
import { IPlatformConfigurationResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { IPlatformConfigurationResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";
import { InjectionAuthMapper } from "../injection/injection-auth-mapper";


export class PlatformConfigurationResponseMapper extends Mapper<IPlatformConfigurationResponseEntity, IPlatformConfigurationResponseDTO> {

    private static instance: PlatformConfigurationResponseMapper;
    private userLoginResponseMapper = InjectionAuthMapper.InjectionUserLoginResponseMapper()
    private currencyLoginResponseMapper = InjectionAuthMapper.InjectionCurrencyLoginResponseMapper()
    private locationLoginResponseMapper = InjectionAuthMapper.InjectionLocationLoginResponseMapper()
    private languageLoginResponseMapper = InjectionAuthMapper.InjectionLanguageLoginResponseMapper()
    private platformLoginResponseMapper = InjectionAuthMapper.InjectionPlatformLoginResponseMapper()
    private countryLoginResponseMapper = InjectionAuthMapper.InjectionCountryLoginResponseMapper()
    private companyLoginResponseMapper = InjectionAuthMapper.InjectionCompanyLoginResponseMapper()
    private rolLoginResponseMapper = InjectionAuthMapper.InjectionRolLoginResponseMapper()
    private permissionLoginResponseMapper = InjectionAuthMapper.InjectionPermissionLoginResponseMapper()
    private menuLoginResponseMapper = InjectionAuthMapper.InjectionMenuLoginResponseMapper()
    public constructor() { super(); }


    public static getInstance(): PlatformConfigurationResponseMapper {
        if (!PlatformConfigurationResponseMapper.instance)
            PlatformConfigurationResponseMapper.instance = new PlatformConfigurationResponseMapper();
        return PlatformConfigurationResponseMapper.instance;
    }

    mapFrom(param: IPlatformConfigurationResponseEntity): IPlatformConfigurationResponseDTO {
        return {
            user: this.userLoginResponseMapper.mapFrom(param.user),
            currency: this.currencyLoginResponseMapper.mapFrom(param.currency),
            location: this.locationLoginResponseMapper.mapFrom(param.location),
            language: this.languageLoginResponseMapper.mapFrom(param.language),
            platform: this.platformLoginResponseMapper.mapFrom(param.platform),
            country: this.countryLoginResponseMapper.mapFrom(param.country),
            company: this.companyLoginResponseMapper.mapFrom(param.company),
            rol: this.rolLoginResponseMapper.mapFrom(param.rol),
            permissions: this.permissionLoginResponseMapper.mapFromList(param.permissions),
            menu: this.menuLoginResponseMapper.mapFromList(param.menu)
        }
    }

    mapFromList(params: IPlatformConfigurationResponseEntity[]): IPlatformConfigurationResponseDTO[] {
        return params.map((param: IPlatformConfigurationResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IPlatformConfigurationResponseDTO): IPlatformConfigurationResponseEntity {
        return {
            user: this.userLoginResponseMapper.mapTo(param.user),
            currency: this.currencyLoginResponseMapper.mapTo(param.currency),
            location: this.locationLoginResponseMapper.mapTo(param.location),
            language: this.languageLoginResponseMapper.mapTo(param.language),
            platform: this.platformLoginResponseMapper.mapTo(param.platform),
            country: this.countryLoginResponseMapper.mapTo(param.country),
            company: this.companyLoginResponseMapper.mapTo(param.company),
            rol: this.rolLoginResponseMapper.mapTo(param.rol),
            permissions: this.permissionLoginResponseMapper.mapToList(param.permissions),
            menu: this.menuLoginResponseMapper.mapToList(param.menu)
        }
    }

    mapToList(params: IPlatformConfigurationResponseDTO[]): IPlatformConfigurationResponseEntity[] {
        return params.map((param: IPlatformConfigurationResponseDTO) => {
            return this.mapTo(param);
        })
    }

}