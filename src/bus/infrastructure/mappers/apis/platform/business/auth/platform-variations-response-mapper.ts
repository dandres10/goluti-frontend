import { Mapper } from "@/bus/core/classes";
import { IPlatformVariationsResponseDTO } from "@/bus/domain/models/apis/platform/business/auth";
import { IPlatformVariationsResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth";
import { InjectionAuthMapper } from "../injection/injection-auth-mapper";




export class PlatformVariationsResponseMapper extends Mapper<IPlatformVariationsResponseEntity, IPlatformVariationsResponseDTO> {

    private static instance: PlatformVariationsResponseMapper;
    private currencyLoginResponseMapper = InjectionAuthMapper.InjectionCurrencyLoginResponseMapper()
    private locationLoginResponseMapper = InjectionAuthMapper.InjectionLocationLoginResponseMapper()
    private languageLoginResponseMapper = InjectionAuthMapper.InjectionLanguageLoginResponseMapper()
    private constructor() {
        super();
    }


    public static getInstance(): PlatformVariationsResponseMapper {
        if (!PlatformVariationsResponseMapper.instance)
            PlatformVariationsResponseMapper.instance = new PlatformVariationsResponseMapper();
        return PlatformVariationsResponseMapper.instance;
    }

    mapFrom(param: IPlatformVariationsResponseEntity): IPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyLoginResponseMapper.mapFromList(param.currencies),
            locations: this.locationLoginResponseMapper.mapFromList(param.locations),
            languages: this.languageLoginResponseMapper.mapFromList(param.languages)
        }
    }

    mapFromList(params: IPlatformVariationsResponseEntity[]): IPlatformVariationsResponseDTO[] {
        return params.map((param: IPlatformVariationsResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IPlatformVariationsResponseDTO): IPlatformVariationsResponseEntity {
        return {
            currencies: this.currencyLoginResponseMapper.mapToList(param.currencies),
            locations: this.locationLoginResponseMapper.mapToList(param.locations),
            languages: this.languageLoginResponseMapper.mapToList(param.languages)
        }
    }

    mapToList(params: IPlatformVariationsResponseDTO[]): IPlatformVariationsResponseEntity[] {
        return params.map((param: IPlatformVariationsResponseDTO) => {
            return this.mapTo(param);
        })
    }

}