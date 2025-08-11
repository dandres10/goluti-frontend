import { CurrencyDeleteMapper } from "@perry/infrastructure/mappers/apis/perry/entities/currency/currency-delete-mapper";
import { CurrencyEntityMapper } from "@perry/infrastructure/mappers/apis/perry/entities/currency/currency-entity-mapper";
import { CurrencyReadMapper } from "@perry/infrastructure/mappers/apis/perry/entities/currency/currency-read-mapper";
import { CurrencySaveMapper } from "@perry/infrastructure/mappers/apis/perry/entities/currency/currency-save-mapper";
import { CurrencyUpdateMapper } from "@perry/infrastructure/mappers/apis/perry/entities/currency/currency-update-mapper";

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