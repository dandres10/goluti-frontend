import { Mapper } from "@/bus/core/classes";
import { ICountryReduxDTO } from "@/bus/domain/models/redux/platform";
import { ICountryLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";



export class CountryReduxMapper extends Mapper<ICountryLoginResponseDTO, ICountryReduxDTO> {

    private static instance: CountryReduxMapper;
    public constructor() { super(); }


    public static getInstance(): CountryReduxMapper {
        if (!CountryReduxMapper.instance)
            CountryReduxMapper.instance = new CountryReduxMapper();
        return CountryReduxMapper.instance;
    }

    mapFrom(param: ICountryLoginResponseDTO): ICountryReduxDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phoneCode,
            state: param.state
        }
    }

    mapFromList(params: ICountryLoginResponseDTO[]): ICountryReduxDTO[] {
        return params.map((param: ICountryLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ICountryReduxDTO): ICountryLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phoneCode,
            state: param.state
        }
    }

    mapToList(params: ICountryReduxDTO[]): ICountryLoginResponseDTO[] {
        return params.map((param: ICountryReduxDTO) => {
            return this.mapTo(param);
        })
    }

}