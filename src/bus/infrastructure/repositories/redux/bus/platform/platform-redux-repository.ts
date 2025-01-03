import { IConfigDTO } from '../../../../../core/interfaces';
import { ACTIONS_BUS } from './platform.action';
import { ICompanyReduxDTO, ICurrencyReduxDTO, ILanguageReduxDTO, ILocationReduxDTO, IPlatformReduxDTO, IRolReduxDTO, IUserReduxDTO } from '../../../../../domain/models/redux/bus/platform';
import { IPlatformReduxRepository } from "../../../../../domain/services/repositories/redux/bus/i-platform-redux-repository";


export class PlatformReduxRepository extends IPlatformReduxRepository {

    private static instance: PlatformReduxRepository;

    public static getInstance(): PlatformReduxRepository {
        if (!PlatformReduxRepository.instance)
            PlatformReduxRepository.instance = new PlatformReduxRepository();
        return PlatformReduxRepository.instance;
    }

    public savePlatform(
        params: IPlatformReduxDTO,
        config: IConfigDTO
    ): void {
        if (config?.dispatch) {
            config.dispatch(ACTIONS_BUS.addPlatformAction(params));
        }
    };

    public readUser(config: IConfigDTO): IUserReduxDTO | undefined {
        if (config?.selector) {
            const user = config.selector((state: any) => state?.bus?.platform?.configuration?.user);
            return user;
        }
        return undefined;
    }

    public readRol(config: IConfigDTO): IRolReduxDTO | undefined {
        if (config?.selector) {
            const data = config?.selector((state: any) => state?.bus?.platform?.configuration?.rol);
            const state = config?.selector((state: any) => state);
            console.log('data state', state);
            return data;
        }
        return undefined;
    }

    public readCompany(config: IConfigDTO): ICompanyReduxDTO | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.configuration?.company);
            return data;
        }
        return undefined;
    }

    public readLanguage(config: IConfigDTO): ILanguageReduxDTO | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.configuration?.language);
            return data;
        }
        return undefined;
    }

    public readLocation(config: IConfigDTO): ILocationReduxDTO | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.configuration?.location);
            return data;
        }
        return undefined;
    }

    public readCurrency(config: IConfigDTO): ICurrencyReduxDTO | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.configuration?.currency);
            return data;
        }
        return undefined;
    }

    public readLocations(config: IConfigDTO): ILocationReduxDTO[] | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.variations?.locations);
            return data;
        }
        return undefined;
    }

    public readLanguages(config: IConfigDTO): ILanguageReduxDTO[] | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.variations?.languages);
            return data;
        }
        return undefined;
    }

    public readCompanies(config: IConfigDTO): ICompanyReduxDTO[] | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.variations?.companies);
            return data;
        }
        return undefined;
    }

    public readCurrencies(config: IConfigDTO): ICurrencyReduxDTO[] | undefined {
        if (config?.selector) {
            const data = config.selector((state: any) => state?.bus?.platform?.variations?.currencies);
            return data;
        }
        return undefined;
    }
}