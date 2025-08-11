import { Mapper } from "@bus/core/classes";
import { IRolReadDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { IRolReadEntity } from "@platform/infrastructure/entities/apis/platform/entities/rol";

export class RolReadMapper extends Mapper<IRolReadEntity, IRolReadDTO> {

  private static instance: RolReadMapper;
  public constructor() { super(); }

  public static getInstance(): RolReadMapper {
    if (!RolReadMapper.instance)
      RolReadMapper.instance = new RolReadMapper();
    return RolReadMapper.instance;
  }

  public mapFrom(param: IRolReadEntity): IRolReadDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IRolReadEntity[]): IRolReadDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolReadDTO): IRolReadEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IRolReadDTO[]): IRolReadEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}