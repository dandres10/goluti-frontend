import { Mapper } from "@/bus/core/classes";
import { ICountryLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { ICountryLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";



export class CountryLoginResponseMapper extends Mapper<ICountryLoginResponseEntity, ICountryLoginResponseDTO> {

    private static instance: CountryLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): CountryLoginResponseMapper {
        if (!CountryLoginResponseMapper.instance)
            CountryLoginResponseMapper.instance = new CountryLoginResponseMapper();
        return CountryLoginResponseMapper.instance;
    }

    mapFrom(param: ICountryLoginResponseEntity): ICountryLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phoneCode: param.phone_code,
            state: param.state
        }
    }

    mapFromList(params: ICountryLoginResponseEntity[]): ICountryLoginResponseDTO[] {
        return params.map((param: ICountryLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ICountryLoginResponseDTO): ICountryLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            phone_code: param.phoneCode,
            state: param.state
        }
    }

    mapToList(params: ICountryLoginResponseDTO[]): ICountryLoginResponseEntity[] {
        return params.map((param: ICountryLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}