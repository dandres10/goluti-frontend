import { Mapper } from "@bus/core/classes";
import { ICurrencyDeleteDTO } from "@perry/domain/models/apis/perry/entities/currency";
import { ICurrencyDeleteEntity } from "@perry/infrastructure/entities/apis/perry/entities/currency";

export class CurrencyDeleteMapper extends Mapper<ICurrencyDeleteEntity, ICurrencyDeleteDTO> {

  private static instance: CurrencyDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): CurrencyDeleteMapper {
    if (!CurrencyDeleteMapper.instance)
      CurrencyDeleteMapper.instance = new CurrencyDeleteMapper();
    return CurrencyDeleteMapper.instance;
  }

  public mapFrom(param: ICurrencyDeleteEntity): ICurrencyDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: ICurrencyDeleteEntity[]): ICurrencyDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ICurrencyDeleteDTO): ICurrencyDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: ICurrencyDeleteDTO[]): ICurrencyDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}