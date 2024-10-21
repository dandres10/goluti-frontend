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
} from "../../business/auth/login/index";


export class InjectionPlatformBusinessAuthMapper {
    public static AuthLoginRequestMapper() { return AuthLoginRequestMapper.getInstance() }
    public static AuthLoginResponseMapper() { return AuthLoginResponseMapper.getInstance() }
    public static CompanyLoginResponseMapper() { return CompanyLoginResponseMapper.getInstance() }
    public static CountryLoginResponseMapper() { return CountryLoginResponseMapper.getInstance() }
    public static CurrencyLoginResponseMapper() { return CurrencyLoginResponseMapper.getInstance() }
    public static LanguageLoginResponseMapper() { return LanguageLoginResponseMapper.getInstance() }
    public static LocationLoginResponseMapper() { return LocationLoginResponseMapper.getInstance() }
    public static MenuLoginResponseMapper() { return MenuLoginResponseMapper.getInstance() }
    public static PermissionLoginResponseMapper() { return PermissionLoginResponseMapper.getInstance() }
    public static PlatformConfigurationResponseMapper() { return PlatformConfigurationResponseMapper.getInstance() }
    public static PlatformLoginResponseMapper() { return PlatformLoginResponseMapper.getInstance() }
    public static PlatformVariationsResponseMapper() { return PlatformVariationsResponseMapper.getInstance() }
    public static RolLoginResponseMapper() { return RolLoginResponseMapper.getInstance() }
    public static UserLoginResponseMapper() { return UserLoginResponseMapper.getInstance() }
}