import { IConfigurationReduxDTO } from "./i-configuration-redux-dto";
import { IVariationsReduxDTO } from "./i-variations-redux-dto";

export interface IPlatformReduxDTO {
  configuration: IConfigurationReduxDTO;
  variations: IVariationsReduxDTO;
  token: string;
}
