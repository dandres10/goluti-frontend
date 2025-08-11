import { Mapper } from "@bus/core/classes";
import { ICurrencyReadDTO } from "@platform/domain/models/apis/platform/entities/currency";
import { ICurrencyReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/currency";

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