import { IConfigDTO } from "@bus/core/interfaces";
import {
    ICompanyReduxDTO,
    ICurrencyReduxDTO,
    ILanguageReduxDTO,
    ILocationReduxDTO,
    IPlatformReduxDTO,
    IRolReduxDTO,
    IUserReduxDTO
} from "@bus/domain/models/redux/bus/platform";


export abstract class IPlatformReduxRepository {
    abstract savePlatform(params: IPlatformReduxDTO, config: IConfigDTO): void;
    abstract readUser(config: IConfigDTO): IUserReduxDTO | undefined;
    abstract readRol(config: IConfigDTO): IRolReduxDTO | undefined;
    abstract readCompany(config: IConfigDTO): ICompanyReduxDTO | undefined;
    abstract readLanguage(config: IConfigDTO): ILanguageReduxDTO | undefined;
    abstract readLocation(config: IConfigDTO): ILocationReduxDTO | undefined;
    abstract readCurrency(config: IConfigDTO): ICurrencyReduxDTO | undefined;

    abstract readLocations(config: IConfigDTO): ILocationReduxDTO[] | undefined;
    abstract readLanguages(config: IConfigDTO): ILanguageReduxDTO[] | undefined;
    abstract readCompanies(config: IConfigDTO): ICompanyReduxDTO[] | undefined;
    abstract readCurrencies(config: IConfigDTO): ICurrencyReduxDTO[] | undefined;

}