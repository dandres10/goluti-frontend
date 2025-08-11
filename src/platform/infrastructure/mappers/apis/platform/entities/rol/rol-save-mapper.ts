import { Mapper } from "@bus/core/classes";
import { IRolSaveDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { IRolSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/rol";

export class RolSaveMapper extends Mapper<IRolSaveEntity, IRolSaveDTO> {

  private static instance: RolSaveMapper;
  public constructor() { super(); }

  public static getInstance(): RolSaveMapper {
    if (!RolSaveMapper.instance)
      RolSaveMapper.instance = new RolSaveMapper();
    return RolSaveMapper.instance;
  }

  public mapFrom(param: IRolSaveEntity): IRolSaveDTO {
    return {
      companyId: param.company_id,
      name: param.name,
      code: param.code,
      description: param.description,
      state: param.state
    };
  }

  public mapFromList(params: IRolSaveEntity[]): IRolSaveDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolSaveDTO): IRolSaveEntity {
    return {
      company_id: param.companyId,
      name: param.name,
      code: param.code,
      description: param.description,
      state: param.state ?? true
    };
  }

  public mapToList(params: IRolSaveDTO[]): IRolSaveEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}