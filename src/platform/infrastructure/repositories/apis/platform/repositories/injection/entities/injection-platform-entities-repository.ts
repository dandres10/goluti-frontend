import { LocationRepository } from "../../entities/location/location-repository";
import { CurrencyRepository } from "../../entities/currency/currency-repository";
import { LanguageRepository } from "../../entities/language/language-repository";
import { RolRepository } from "../../entities/rol/rol-repository";
export class InjectionPlatformEntitiesRepository {
  public static LocationRepository() { return LocationRepository.getInstance(); }  public static CurrencyRepository() { return CurrencyRepository.getInstance(); }
  public static LanguageRepository() { return LanguageRepository.getInstance(); }
  public static RolRepository() { return RolRepository.getInstance(); }
}


