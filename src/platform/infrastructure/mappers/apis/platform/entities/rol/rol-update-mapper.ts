import { Mapper } from "@bus/core/classes";
import { IRolUpdateDTO } from "@platform/domain/models/apis/platform/entities/rol";
import { IRolUpdateEntity } from "@platform/infrastructure/entities/apis/platform/entities/rol";

export class RolUpdateMapper extends Mapper<IRolUpdateEntity, IRolUpdateDTO> {

  private static instance: RolUpdateMapper;
  public constructor() { super(); }

  public static getInstance(): RolUpdateMapper {
    if (!RolUpdateMapper.instance)
      RolUpdateMapper.instance = new RolUpdateMapper();
    return RolUpdateMapper.instance;
  }

  public mapFrom(param: IRolUpdateEntity): IRolUpdateDTO {
    return {
      companyId: param.company_id,
      name: param.name,
      code: param.code,
      description: param.description,
      state: param.state
    };
  }

  public mapFromList(params: IRolUpdateEntity[]): IRolUpdateDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: IRolUpdateDTO): IRolUpdateEntity {
    return {
      company_id: param.companyId,
      name: param.name,
      code: param.code,
      description: param.description,
      state: param.state
    };
  }

  public mapToList(params: IRolUpdateDTO[]): IRolUpdateEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}