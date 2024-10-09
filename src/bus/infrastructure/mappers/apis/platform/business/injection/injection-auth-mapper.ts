import {
    AuthLoginRequestMapper,
    AuthLoginResponseMapper,
    CompanyLoginResponseMapper,
    CountryLoginResponseMapper,
    CurrencyLoginResponseMapper,
    LanguageLoginResponseMapper,
    LocationLoginResponseMapper,
    MenuLoginResponseMapper,
    PermissionLoginResponseMapper,
    PlatformConfigurationResponseMapper,
    PlatformLoginResponseMapper,
    PlatformVariationsResponseMapper,
    RolLoginResponseMapper,
    UserLoginResponseMapper
} from "../auth/index";


export class InjectionAuthMapper {
    public static InjectionAuthLoginRequestMapper() { return AuthLoginRequestMapper.getInstance() }
    public static InjectionAuthLoginResponseMapper() { return AuthLoginResponseMapper.getInstance() }
    public static InjectionCompanyLoginResponseMapper() { return CompanyLoginResponseMapper.getInstance() }
    public static InjectionCountryLoginResponseMapper() { return CountryLoginResponseMapper.getInstance() }
    public static InjectionCurrencyLoginResponseMapper() { return CurrencyLoginResponseMapper.getInstance() }
    public static InjectionLanguageLoginResponseMapper() { return LanguageLoginResponseMapper.getInstance() }
    public static InjectionLocationLoginResponseMapper() { return LocationLoginResponseMapper.getInstance() }
    public static InjectionMenuLoginResponseMapper() { return MenuLoginResponseMapper.getInstance() }
    public static InjectionPermissionLoginResponseMapper() { return PermissionLoginResponseMapper.getInstance() }
    public static InjectionPlatformConfigurationResponseMapper() { return PlatformConfigurationResponseMapper.getInstance() }
    public static InjectionPlatformLoginResponseMapper() { return PlatformLoginResponseMapper.getInstance() }
    public static InjectionPlatformVariationsResponseMapper() { return PlatformVariationsResponseMapper.getInstance() }
    public static InjectionRolLoginResponseMapper() { return RolLoginResponseMapper.getInstance() }
    public static InjectionUserLoginResponseMapper() { return UserLoginResponseMapper.getInstance() }
}