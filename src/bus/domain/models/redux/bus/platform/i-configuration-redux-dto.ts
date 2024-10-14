
import { ICompanyReduxDTO } from "./i-company-redux-dto";
import { ICountryReduxDTO } from "./i-country-redux-dto";
import { ICurrencyReduxDTO } from "./i-currency-redux-dto";
import { ILanguageReduxDTO } from "./i-language-redux-dto";
import { ILocationReduxDTO } from "./i-location-redux-dto";
import { IMenuReduxDTO } from "./i-menu-redux-dto";
import { IPermissionReduxDTO } from "./i-permission-redux-dto";
import { IPlatformInitialReduxDTO } from "./i-platform-initial-redux-dto";
import { IRolReduxDTO } from "./i-rol-redux-dto";
import { IUserReduxDTO } from "./i-user-redux-dto";

export interface IConfigurationReduxDTO {
  user: IUserReduxDTO;
  currency: ICurrencyReduxDTO;
  location: ILocationReduxDTO;
  language: ILanguageReduxDTO;
  platform: IPlatformInitialReduxDTO;
  country: ICountryReduxDTO;
  company: ICompanyReduxDTO;
  rol: IRolReduxDTO;
  permissions: IPermissionReduxDTO[];
  menu: IMenuReduxDTO[];
}
