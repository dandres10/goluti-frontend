import { ICompanyReduxDTO } from "./i-company-redux-dto";
import { ICurrencyReduxDTO } from "./i-currency-redux-dto";
import { ILanguageReduxDTO } from "./i-language-redux-dto";
import { ILocationReduxDTO } from "./i-location-redux-dto";

export interface IVariationsReduxDTO {
  currencies: ICurrencyReduxDTO[];
  locations: ILocationReduxDTO[];
  languages: ILanguageReduxDTO[];
  companies: ICompanyReduxDTO[];
}
