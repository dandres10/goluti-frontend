import { Mapper } from "@/bus/core/classes";
import { ICurrencyReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { ICurrencyLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class CurrencyReduxMapper extends Mapper<ICurrencyLoginResponseDTO, ICurrencyReduxDTO> {

    private static instance: CurrencyReduxMapper;
    public constructor() { super(); }


    public static getInstance(): CurrencyReduxMapper {
        if (!CurrencyReduxMapper.instance)
            CurrencyReduxMapper.instance = new CurrencyReduxMapper();
        return CurrencyReduxMapper.instance;
    }

    mapFrom(param: ICurrencyLoginResponseDTO): ICurrencyReduxDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    mapFromList(params: ICurrencyLoginResponseDTO[]): ICurrencyReduxDTO[] {
        return params.map((param: ICurrencyLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ICurrencyReduxDTO): ICurrencyLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            symbol: param.symbol,
            state: param.state
        }
    }

    mapToList(params: ICurrencyReduxDTO[]): ICurrencyLoginResponseDTO[] {
        return params.map((param: ICurrencyReduxDTO) => {
            return this.mapTo(param);
        })
    }

}