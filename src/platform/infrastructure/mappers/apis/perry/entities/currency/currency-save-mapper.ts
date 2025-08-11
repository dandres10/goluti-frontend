import { Mapper } from "@bus/core/classes";
import { ICurrencySaveDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { ICurrencySaveEntity } from "@perry/infrastructure/entities/apis/perry/entities/currency";

export class CurrencySaveMapper extends Mapper<ICurrencySaveEntity, ICurrencySaveDTO> {

  private static instance: CurrencySaveMapper;
  public constructor() { super(); }

  public static getInstance(): CurrencySaveMapper {
    if (!CurrencySaveMapper.instance)
      CurrencySaveMapper.instance = new CurrencySaveMapper();
    return CurrencySaveMapper.instance;
  }

  public mapFrom(param: ICurrencySaveEntity): ICurrencySaveDTO {
    return {
      name: param.name,
      code: param.code,
      symbol: param.symbol,
      state: param.state
    };
  }

  public mapFromList(params: ICurrencySaveEntity[]): ICurrencySaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICurrencySaveDTO): ICurrencySaveEntity {
    return {
      name: param.name,
      code: param.code,
      symbol: param.symbol,
      state: param.state ?? true
    };
  }

  public mapToList(params: ICurrencySaveDTO[]): ICurrencySaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}