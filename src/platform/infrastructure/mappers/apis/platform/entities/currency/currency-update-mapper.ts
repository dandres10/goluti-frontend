import { Mapper } from "@bus/core/classes";
import { ICurrencyUpdateDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { ICurrencyUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/currency";

export class CurrencyUpdateMapper extends Mapper<ICurrencyUpdateEntity, ICurrencyUpdateDTO> {

  private static instance: CurrencyUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): CurrencyUpdateMapper {
    if (!CurrencyUpdateMapper.instance)
      CurrencyUpdateMapper.instance = new CurrencyUpdateMapper();
    return CurrencyUpdateMapper.instance;
  }

  public mapFrom(param: ICurrencyUpdateEntity): ICurrencyUpdateDTO {
    return {
      name: param.name,
      code: param.code,
      symbol: param.symbol,
      state: param.state
    };
  }

  public mapFromList(params: ICurrencyUpdateEntity[]): ICurrencyUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICurrencyUpdateDTO): ICurrencyUpdateEntity {
    return {
      name: param.name,
      code: param.code,
      symbol: param.symbol,
      state: param.state
    };
  }

  public mapToList(params: ICurrencyUpdateDTO[]): ICurrencyUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}