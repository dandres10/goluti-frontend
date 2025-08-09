import { Mapper } from "@bus/core/classes";
import { ILocationDTO } from "@bus/domain/models/apis/platform/entities/location";
import { ILocationEntity } from "@bus/infrastructure/entities/apis/platform/entities/location";

export class LocationEntityMapper extends Mapper<ILocationEntity, ILocationDTO> {
  private static instance: LocationEntityMapper;
  public constructor() { super(); }

  public static getInstance(): LocationEntityMapper {
    if (!LocationEntityMapper.instance)
      LocationEntityMapper.instance = new LocationEntityMapper();
    return LocationEntityMapper.instance;
  }

  public mapFrom(param: ILocationEntity): ILocationDTO {
    return {
      id: param.id,
      companyId: param.company_id,
      countryId: param.country_id,
      name: param.name,
      address: param.address,
      city: param.city,
      phone: param.phone,
      email: param.email,
      mainLocation: param.main_location,
      state: param.state,
      createdDate: param.created_date,
      updatedDate: param.updated_date,
    };
  }

  public mapFromList(params: ILocationEntity[]): ILocationDTO[] {
    return params.map((param) => this.mapFrom(param));
  }

  public mapTo(param: ILocationDTO): ILocationEntity {
    return {
      id: param.id,
      company_id: param.companyId,
      country_id: param.countryId,
      name: param.name,
      address: param.address,
      city: param.city,
      phone: param.phone,
      email: param.email,
      main_location: param.mainLocation,
      state: param.state,
      created_date: param.createdDate,
      updated_date: param.updatedDate,
    };
  }

  public mapToList(params: ILocationDTO[]): ILocationEntity[] {
    return params.map((param) => this.mapTo(param));
  }
}


