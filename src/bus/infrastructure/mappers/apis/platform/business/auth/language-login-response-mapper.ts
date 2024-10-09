import { Mapper } from "@/bus/core/classes";
import { ILanguageLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { ILanguageLoginResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";



export class LanguageLoginResponseMapper extends Mapper<ILanguageLoginResponseEntity, ILanguageLoginResponseDTO> {

    private static instance: LanguageLoginResponseMapper;
    public constructor() { super(); }


    public static getInstance(): LanguageLoginResponseMapper {
        if (!LanguageLoginResponseMapper.instance)
            LanguageLoginResponseMapper.instance = new LanguageLoginResponseMapper();
        return LanguageLoginResponseMapper.instance;
    }

    mapFrom(param: ILanguageLoginResponseEntity): ILanguageLoginResponseDTO {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            nativeName: param.native_name,
            state: param.state
        }
    }

    mapFromList(params: ILanguageLoginResponseEntity[]): ILanguageLoginResponseDTO[] {
        return params.map((param: ILanguageLoginResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: ILanguageLoginResponseDTO): ILanguageLoginResponseEntity {
        return {
            id: param.id,
            name: param.name,
            code: param.code,
            native_name: param.nativeName,
            state: param.state
        }
    }

    mapToList(params: ILanguageLoginResponseDTO[]): ILanguageLoginResponseEntity[] {
        return params.map((param: ILanguageLoginResponseDTO) => {
            return this.mapTo(param);
        })
    }

}