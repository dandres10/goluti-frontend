import { ICompanyReduxDTO } from "./i-company-redux-dto";
import { ICurrencyReduxDTO } from "./i-currency-redux-dto";
import { ILanguageReduxDTO } from "./i-language-redux-dto";
import { ILocationReduxDTO } from "./i-location-redux-dto";
import { IRolReduxDTO } from "./i-rol-redux-dto";

export interface IPlatformConfigurationDTO {
    rol_id?: string,
    language_id?: string,
    location_id?: string,
    currency_id?: string,
    company_id?: string,
    languages?: ILanguageReduxDTO[],
    locations?: ILocationReduxDTO[],
    currencies?: ICurrencyReduxDTO[],
    companies?: ICompanyReduxDTO[],
    rols?: IRolReduxDTO[],
}