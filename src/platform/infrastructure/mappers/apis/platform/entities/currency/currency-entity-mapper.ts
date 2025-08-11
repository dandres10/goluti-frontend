import { Mapper } from "@bus/core/classes";
import { ICurrencyDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { ICurrencyEntity } from "@platform/infrastructure/entities/apis/platform/entities/currency";

export class CurrencyEntityMapper extends Mapper<ICurrencyEntity, ICurrencyDTO> {
  private static instance: CurrencyEntityMapper;
  public constructor() { super(); }

  public static getInstance(): CurrencyEntityMapper {
    if (!CurrencyEntityMapper.instance)
      CurrencyEntityMapper.instance = new CurrencyEntityMapper();
    return CurrencyEntityMapper.instance;
  }

  public mapFrom(param: ICurrencyEntity): ICurrencyDTO {
    return {
      id: param.id,
      name: param.name,
      code: param.code,
      symbol: param.symbol,
      state: param.state
    };
  }

  public mapFromList(params: ICurrencyEntity[]): ICurrencyDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICurrencyDTO): ICurrencyEntity {
    return {
      id: param.id,
      name: param.name,
      code: param.code,
      symbol: param.symbol,
      state: param.state
    };
  }

  public mapToList(params: ICurrencyDTO[]): ICurrencyEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}