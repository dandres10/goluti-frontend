import { Mapper } from "@/bus/core/classes";
import { ICompanyReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { ICompanyLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class CompanyReduxMapper extends Mapper<ICompanyLoginResponseDTO, ICompanyReduxDTO> {

    private static instance: CompanyReduxMapper;
    public constructor() { super(); }


    public static getInstance(): CompanyReduxMapper {
        if (!CompanyReduxMapper.instance)
            CompanyReduxMapper.instance = new CompanyReduxMapper();
        return CompanyReduxMapper.instance;
    }

    mapFrom(param: ICompanyLoginResponseDTO): ICompanyReduxDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivityTime,
            nit: param.nit,
            state: param.state,
        }
    }

    mapFromList(params: ICompanyLoginResponseDTO[]): ICompanyReduxDTO[] {
        return params.map((param: ICompanyLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ICompanyReduxDTO): ICompanyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            inactivityTime: param.inactivityTime,
            nit: param.nit,
            state: param.state,
        }
    }

    mapToList(params: ICompanyReduxDTO[]): ICompanyLoginResponseDTO[] {
        return params.map((param: ICompanyReduxDTO) => {
            return this.mapTo(param);
        })
    }

}