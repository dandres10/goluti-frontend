import {
    ReadUserUseCase,
    SavePlatformUseCase,
    PlatformConfigurationUseCase,
    ReadCompaniesUseCase,
    ReadCompanyUseCase,
    ReadCurrenciesUseCase,
    ReadCurrencyUseCase,
    ReadLanguagesUseCase,
    ReadLanguageUseCase,
    ReadLocationsUseCase,
    ReadLocationUseCase,
    ReadRolUseCase
} from "@bus/domain/services/use_cases/redux/bus/platform";


export class InjectionPlatformReduxUseCase {
    public static SavePlatformUseCase() { return SavePlatformUseCase.getInstance() }
    public static ReadUserUseCase() { return ReadUserUseCase.getInstance() }
    public static PlatformConfigurationUseCase() { return PlatformConfigurationUseCase.getInstance() }
    public static ReadCompaniesUseCase() { return ReadCompaniesUseCase.getInstance() }
    public static ReadCompanyUseCase() { return ReadCompanyUseCase.getInstance() }
    public static ReadCurrenciesUseCase() { return ReadCurrenciesUseCase.getInstance() }
    public static ReadCurrencyUseCase() { return ReadCurrencyUseCase.getInstance() }
    public static ReadLanguageUseCase() { return ReadLanguageUseCase.getInstance() }
    public static ReadLanguagesUseCase() { return ReadLanguagesUseCase.getInstance() }
    public static ReadLocationUseCase() { return ReadLocationUseCase.getInstance() }
    public static ReadLocationsUseCase() { return ReadLocationsUseCase.getInstance() }
    public static ReadRolUseCase() { return ReadRolUseCase.getInstance() }
}