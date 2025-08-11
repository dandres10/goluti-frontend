import { Mapper } from "@bus/core/classes";
import { IRolDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { IRolEntity } from "@platform/infrastructure/entities/apis/platform/entities/rol";

export class RolEntityMapper extends Mapper<IRolEntity, IRolDTO> {
  private static instance: RolEntityMapper;
  public constructor() { super(); }

  public static getInstance(): RolEntityMapper {
    if (!RolEntityMapper.instance)
      RolEntityMapper.instance = new RolEntityMapper();
    return RolEntityMapper.instance;
  }

  public mapFrom(param: IRolEntity): IRolDTO {
    return {
      id: param.id,
      companyId: param.company_id,
      name: param.name,
      code: param.code,
      description: param.description,
      state: param.state
    };
  }

  public mapFromList(params: IRolEntity[]): IRolDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolDTO): IRolEntity {
    return {
      id: param.id,
      company_id: param.companyId,
      name: param.name,
      code: param.code,
      description: param.description,
      state: param.state
    };
  }

  public mapToList(params: IRolDTO[]): IRolEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}