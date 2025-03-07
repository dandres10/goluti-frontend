import { ICurrencyLoginResponseDTO } from "./i-currency-login-response-dto";
import { ILanguageLoginResponseDTO } from "./i-language-login-response-dto";
import { ILocationLoginResponseDTO } from "./i-location-login-response-dto";

export interface IPlatformVariationsResponseDTO {
  currencies: ICurrencyLoginResponseDTO[];
  locations: ILocationLoginResponseDTO[];
  languages: ILanguageLoginResponseDTO[];
}
