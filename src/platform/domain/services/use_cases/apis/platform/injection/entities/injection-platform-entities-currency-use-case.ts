import { CurrencyDeleteUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/currency/currency-delete-use-case";
import { CurrencyListUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/currency/currency-list-use-case";
import { CurrencyReadUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/currency/currency-read-use-case";
import { CurrencySaveUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/currency/currency-save-use-case";
import { CurrencyUpdateUseCase } from "@platform/domain/services/use_cases/apis/platform/entities/currency/currency-update-use-case";

export class InjectionPlatformEntitiesCurrencyUseCase {
  public static CurrencyReadUseCase(): CurrencyReadUseCase {
    return CurrencyReadUseCase.getInstance();
  }

  public static CurrencySaveUseCase(): CurrencySaveUseCase {
    return CurrencySaveUseCase.getInstance();
  }

  public static CurrencyUpdateUseCase(): CurrencyUpdateUseCase {
    return CurrencyUpdateUseCase.getInstance();
  }

  public static CurrencyDeleteUseCase(): CurrencyDeleteUseCase {
    return CurrencyDeleteUseCase.getInstance();
  }

  public static CurrencyListUseCase(): CurrencyListUseCase {
    return CurrencyListUseCase.getInstance();
  }
}