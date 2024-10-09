import { Mapper } from "@/bus/core/classes";
import { ICurrencyLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { ICurrencyLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";


export class CurrencyLoginResponseMapper extends Mapper<ICurrencyLoginResponseEntity, ICurrencyLoginResponseDTO> {

    private static instance: CurrencyLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): CurrencyLoginResponseMapper {
        if (!CurrencyLoginResponseMapper.instance)
            CurrencyLoginResponseMapper.instance = new CurrencyLoginResponseMapper();
        return CurrencyLoginResponseMapper.instance;
    }

    mapFrom(param: ICurrencyLoginResponseEntity): ICurrencyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    mapFromList(params: ICurrencyLoginResponseEntity[]): ICurrencyLoginResponseDTO[] {
        return params.map((param: ICurrencyLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ICurrencyLoginResponseDTO): ICurrencyLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    mapToList(params: ICurrencyLoginResponseDTO[]): ICurrencyLoginResponseEntity[] {
        return params.map((param: ICurrencyLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}