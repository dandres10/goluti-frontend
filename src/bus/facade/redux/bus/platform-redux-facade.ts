import { IConfigDTO } from "@bus/core/interfaces";
import { InjectionPlatformReduxUseCase } from "@bus/domain/services/use_cases/redux/injection";
import {
    ICompanyReduxDTO,
    ICurrencyReduxDTO,
    ILanguageReduxDTO,
    ILocationReduxDTO,
    IPlatformReduxDTO,
    IRolReduxDTO,
    IUserReduxDTO
} from "@bus/domain/models/redux/bus/platform";
import { IPlatformConfigurationDTO } from "@/bus/domain/models/redux/bus/platform/i-platform-configuration-dto";

export class PlatformReduxFacade {
    private static instance: PlatformReduxFacade;
    private savePlatformUseCase = InjectionPlatformReduxUseCase.SavePlatformUseCase();
    private readUserUseCase = InjectionPlatformReduxUseCase.ReadUserUseCase();
    private readCompaniesUseCase = InjectionPlatformReduxUseCase.ReadCompaniesUseCase();
    private readCompanyUseCase = InjectionPlatformReduxUseCase.ReadCompanyUseCase();
    private readCurrenciesUseCase = InjectionPlatformReduxUseCase.ReadCurrenciesUseCase();
    private readCurrencyUseCase = InjectionPlatformReduxUseCase.ReadCurrencyUseCase();
    private readLanguageUseCase = InjectionPlatformReduxUseCase.ReadLanguageUseCase();
    private readLanguagesUseCase = InjectionPlatformReduxUseCase.ReadLanguagesUseCase();
    private readLocationUseCase = InjectionPlatformReduxUseCase.ReadLocationUseCase();
    private readLocationsUseCase = InjectionPlatformReduxUseCase.ReadLocationsUseCase();
    private readRolUseCase = InjectionPlatformReduxUseCase.ReadRolUseCase();
    private platformConfigurationUseCase = InjectionPlatformReduxUseCase.PlatformConfigurationUseCase();


    public static getInstance(): PlatformReduxFacade {
        if (!PlatformReduxFacade.instance)
            PlatformReduxFacade.instance = new PlatformReduxFacade();
        return PlatformReduxFacade.instance;
    }


    public savePlatform(params: IPlatformReduxDTO | null, config: IConfigDTO): void {
        this.savePlatformUseCase.execute(params, config);
    }

    public readUser(config: IConfigDTO): IUserReduxDTO | undefined {
        return this.readUserUseCase.execute(config)
    }

    public readCompanies(config: IConfigDTO): ICompanyReduxDTO[] | undefined {
        return this.readCompaniesUseCase.execute(config)
    }

    public readCompany(config: IConfigDTO): ICompanyReduxDTO | undefined {
        return this.readCompanyUseCase.execute(config)
    }

    public readCurrencies(config: IConfigDTO): ICurrencyReduxDTO[] | undefined {
        return this.readCurrenciesUseCase.execute(config)
    }

    public readCurrency(config: IConfigDTO): ICurrencyReduxDTO | undefined {
        return this.readCurrencyUseCase.execute(config)
    }

    public readLanguage(config: IConfigDTO): ILanguageReduxDTO | undefined {
        return this.readLanguageUseCase.execute(config)
    }

    public readLanguages(config: IConfigDTO): ILanguageReduxDTO[] | undefined {
        return this.readLanguagesUseCase.execute(config)
    }

    public readLocation(config: IConfigDTO): ILocationReduxDTO | undefined {
        return this.readLocationUseCase.execute(config)
    }

    public readLocations(config: IConfigDTO): ILocationReduxDTO[] | undefined {
        return this.readLocationsUseCase.execute(config)
    }

    public readRol(config: IConfigDTO): IRolReduxDTO | undefined {
        return this.readRolUseCase.execute(config)
    }

    public platformConfiguration(config: IConfigDTO): IPlatformConfigurationDTO | undefined {
        return this.platformConfigurationUseCase.execute(config)
    }

}