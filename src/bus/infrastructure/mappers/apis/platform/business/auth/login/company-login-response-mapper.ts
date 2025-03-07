import { Mapper } from "../../../../../../../core/classes";
import { ICompanyLoginResponseDTO } from "../../../../../../../domain/models/apis/platform/business/auth/login";
import { ICompanyLoginResponseEntity } from "../../../../../../../infrastructure/entities/apis/platform/business/auth/login";


export class CompanyLoginResponseMapper extends Mapper<ICompanyLoginResponseEntity, ICompanyLoginResponseDTO> {

    private static instance: CompanyLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): CompanyLoginResponseMapper {
        if (!CompanyLoginResponseMapper.instance)
            CompanyLoginResponseMapper.instance = new CompanyLoginResponseMapper();
        return CompanyLoginResponseMapper.instance;
    }

    public mapFrom(param: ICompanyLoginResponseEntity): ICompanyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivity_time,
            nit: param.nit,
            state: param.state,
        }
    }

    public mapFromList(params: ICompanyLoginResponseEntity[]): ICompanyLoginResponseDTO[] {
        return params.map((param: ICompanyLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ICompanyLoginResponseDTO): ICompanyLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            inactivity_time: param.inactivityTime,
            nit: param.nit,
            state: param.state,
        }
    }

    public mapToList(params: ICompanyLoginResponseDTO[]): ICompanyLoginResponseEntity[] {
        return params.map((param: ICompanyLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}