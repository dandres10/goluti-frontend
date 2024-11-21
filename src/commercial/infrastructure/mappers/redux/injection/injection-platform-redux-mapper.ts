import {
    CompanyReduxMapper,
    ConfigurationReduxMapper,
    CountryReduxMapper,
    CurrencyReduxMapper,
    LanguageReduxMapper,
    LocationReduxMapper,
    MenuReduxMapper,
    PermissionReduxMapper,
    PlatformReduxMapper,
    VariationsReduxMapper,
    RolReduxMapper,
    UserReduxMapper,
    PlatformInitialReduxMapper
} from "../bus/platform";

export class InjectionPlatformReduxMapper {
    public static CompanyReduxMapper() { return CompanyReduxMapper.getInstance() }
    public static ConfigurationReduxMapper() { return ConfigurationReduxMapper.getInstance() }
    public static CountryReduxMapper() { return CountryReduxMapper.getInstance() }
    public static CurrencyReduxMapper() { return CurrencyReduxMapper.getInstance() }
    public static LanguageReduxMapper() { return LanguageReduxMapper.getInstance() }
    public static LocationReduxMapper() { return LocationReduxMapper.getInstance() }
    public static MenuReduxMapper() { return MenuReduxMapper.getInstance() }
    public static PermissionReduxMapper() { return PermissionReduxMapper.getInstance() }
    public static PlatformReduxMapper() { return PlatformReduxMapper.getInstance() }
    public static VariationsReduxMapper() { return VariationsReduxMapper.getInstance() }
    public static RolReduxMapper() { return RolReduxMapper.getInstance() }
    public static UserReduxMapper() { return UserReduxMapper.getInstance() }
    public static PlatformInitialReduxMapper() { return PlatformInitialReduxMapper.getInstance() }
}