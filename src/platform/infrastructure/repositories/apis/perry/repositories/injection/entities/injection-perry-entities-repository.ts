import { CurrencyRepository } from "../../entities/currency/currency-repository";

export class InjectionPerryEntitiesRepository {
  public static CurrencyRepository() { return CurrencyRepository.getInstance(); }
}


