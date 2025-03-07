import { IPlatformConfigurationResponseEntity } from "./i-platform-configuration-response-entity";
import { IPlatformVariationsResponseEntity } from "./i-platform-variations-response-entity";

export interface IAuthLoginResponseEntity {
  platform_configuration: IPlatformConfigurationResponseEntity;
  platform_variations: IPlatformVariationsResponseEntity;
  token: string;
}
