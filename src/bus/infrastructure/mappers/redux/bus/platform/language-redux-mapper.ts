import { Mapper } from "@/bus/core/classes";
import { ILanguageReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { ILanguageLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";



export class LanguageReduxMapper extends Mapper<ILanguageLoginResponseDTO, ILanguageReduxDTO> {

    private static instance: LanguageReduxMapper;
    public constructor() { super(); }


    public static getInstance(): LanguageReduxMapper {
        if (!LanguageReduxMapper.instance)
            LanguageReduxMapper.instance = new LanguageReduxMapper();
        return LanguageReduxMapper.instance;
    }

    mapFrom(param: ILanguageLoginResponseDTO): ILanguageReduxDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.nativeName,
            state: param.state
        }
    }

    mapFromList(params: ILanguageLoginResponseDTO[]): ILanguageReduxDTO[] {
        return params.map((param: ILanguageLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ILanguageReduxDTO): ILanguageLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.nativeName,
            state: param.state
        }
    }

    mapToList(params: ILanguageReduxDTO[]): ILanguageLoginResponseDTO[] {
        return params.map((param: ILanguageReduxDTO) => {
            return this.mapTo(param);
        })
    }

}