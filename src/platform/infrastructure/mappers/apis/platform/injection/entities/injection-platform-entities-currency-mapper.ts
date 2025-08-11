import { CurrencyDeleteMapper } from "@platform/infrastructure/mappers/apis/platform/entities/currency/currency-delete-mapper";
import { CurrencyEntityMapper } from "@platform/infrastructure/mappers/apis/platform/entities/currency/currency-entity-mapper";
import { CurrencyReadMapper } from "@platform/infrastructure/mappers/apis/platform/entities/currency/currency-read-mapper";
import { CurrencySaveMapper } from "@platform/infrastructure/mappers/apis/platform/entities/currency/currency-save-mapper";
import { CurrencyUpdateMapper } from "@platform/infrastructure/mappers/apis/platform/entities/currency/currency-update-mapper";

export class InjectionPlatformEntitiesCurrencyMapper {
  public static CurrencyEntityMapper(): CurrencyEntityMapper {
    return CurrencyEntityMapper.getInstance();
  }

  public static CurrencySaveMapper(): CurrencySaveMapper {
    return CurrencySaveMapper.getInstance();
  }

  public static CurrencyReadMapper(): CurrencyReadMapper {
    return CurrencyReadMapper.getInstance();
  }

  public static CurrencyUpdateMapper(): CurrencyUpdateMapper {
    return CurrencyUpdateMapper.getInstance();
  }

  public static CurrencyDeleteMapper(): CurrencyDeleteMapper {
    return CurrencyDeleteMapper.getInstance();
  }
}