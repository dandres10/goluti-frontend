import { Mapper } from "@bus/core/classes";
import { IRolDeleteDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { IRolDeleteEntity } from "@platform/infrastructure/entities/apis/platform/entities/rol";

export class RolDeleteMapper extends Mapper<IRolDeleteEntity, IRolDeleteDTO> {

  private static instance: RolDeleteMapper;
  public constructor() { super(); }

  public static getInstance(): RolDeleteMapper {
    if (!RolDeleteMapper.instance)
      RolDeleteMapper.instance = new RolDeleteMapper();
    return RolDeleteMapper.instance;
  }

  public mapFrom(param: IRolDeleteEntity): IRolDeleteDTO {
    return {
      id: param.id
    };
  }

  public mapFromList(params: IRolDeleteEntity[]): IRolDeleteDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolDeleteDTO): IRolDeleteEntity {
    return {
      id: param.id
    };
  }

  public mapToList(params: IRolDeleteDTO[]): IRolDeleteEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}