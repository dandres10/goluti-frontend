import { Mapper } from "../../../../../core/classes";
import { InjectionPlatformReduxMapper } from "../../injection";
import { IConfigurationReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IPlatformConfigurationResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class ConfigurationReduxMapper extends Mapper<IPlatformConfigurationResponseDTO, IConfigurationReduxDTO> {

    private static instance: ConfigurationReduxMapper;
    private userReduxMapper = InjectionPlatformReduxMapper.UserReduxMapper()
    private currencyReduxMapper = InjectionPlatformReduxMapper.CurrencyReduxMapper()
    private locationReduxMapper = InjectionPlatformReduxMapper.LocationReduxMapper()
    private languageReduxMapper = InjectionPlatformReduxMapper.LanguageReduxMapper()
    private platformInitialReduxMapper = InjectionPlatformReduxMapper.PlatformInitialReduxMapper()
    private countryReduxMapper = InjectionPlatformReduxMapper.CountryReduxMapper()
    private companyReduxMapper = InjectionPlatformReduxMapper.CompanyReduxMapper()
    private rolReduxMapper = InjectionPlatformReduxMapper.RolReduxMapper()
    private permissionReduxMapper = InjectionPlatformReduxMapper.PermissionReduxMapper()
    private menuReduxMapper = InjectionPlatformReduxMapper.MenuReduxMapper()
    public constructor() { super(); }


    public static getInstance(): ConfigurationReduxMapper {
        if (!ConfigurationReduxMapper.instance)
            ConfigurationReduxMapper.instance = new ConfigurationReduxMapper();
        return ConfigurationReduxMapper.instance;
    }

    public mapFrom(param: IPlatformConfigurationResponseDTO): IConfigurationReduxDTO {
        return {
            user: this.userReduxMapper.mapFrom(param.user),
            currency: this.currencyReduxMapper.mapFrom(param.currency),
            location: this.locationReduxMapper.mapFrom(param.location),
            language: this.languageReduxMapper.mapFrom(param.language),
            platform: this.platformInitialReduxMapper.mapFrom(param.platform),
            country: this.countryReduxMapper.mapFrom(param.country),
            company: this.companyReduxMapper.mapFrom(param.company),
            rol: this.rolReduxMapper.mapFrom(param.rol),
            permissions: this.permissionReduxMapper.mapFromList(param.permissions),
            menu: this.menuReduxMapper.mapFromList(param.menu)
        }
    }

    public mapFromList(params: IPlatformConfigurationResponseDTO[]): IConfigurationReduxDTO[] {
        return params.map((param: IPlatformConfigurationResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IConfigurationReduxDTO): IPlatformConfigurationResponseDTO {
        return {
            user: this.userReduxMapper.mapTo(param.user),
            currency: this.currencyReduxMapper.mapTo(param.currency),
            location: this.locationReduxMapper.mapTo(param.location),
            language: this.languageReduxMapper.mapTo(param.language),
            platform: this.platformInitialReduxMapper.mapTo(param.platform),
            country: this.countryReduxMapper.mapTo(param.country),
            company: this.companyReduxMapper.mapTo(param.company),
            rol: this.rolReduxMapper.mapTo(param.rol),
            permissions: this.permissionReduxMapper.mapToList(param.permissions),
            menu: this.menuReduxMapper.mapToList(param.menu)
        }
    }

    public mapToList(params: IConfigurationReduxDTO[]): IPlatformConfigurationResponseDTO[] {
        return params.map((param: IConfigurationReduxDTO) => {
            return this.mapTo(param);
        })
    }

}