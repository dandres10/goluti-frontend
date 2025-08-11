import { Mapper } from "@bus/core/classes";
import { ICurrencyReadDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { ICurrencyReadEntity } from "@perry/infrastructure/entities/apis/perry/entities/currency";

export class CurrencyReadMapper extends Mapper<ICurrencyReadEntity, ICurrencyReadDTO> {

  private static instance: CurrencyReadMapper;
  public constructor() { super(); }

  public static getInstance(): CurrencyReadMapper {
    if (!CurrencyReadMapper.instance)
      CurrencyReadMapper.instance = new CurrencyReadMapper();
    return CurrencyReadMapper.instance;
  }

  public mapFrom(param: ICurrencyReadEntity): ICurrencyReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICurrencyReadEntity[]): ICurrencyReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICurrencyReadDTO): ICurrencyReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICurrencyReadDTO[]): ICurrencyReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}