import { Mapper } from "@/bus/core/classes";
import { IPlatformVariationsResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { IPlatformVariationsResponseEntity } from "@/bus/infrastructure/entities/apis/platform/business/auth/login";
import { InjectionPlatformBusinessAuthMapper } from "../../injection/business/injection-platform-business-auth-mapper";




export class PlatformVariationsResponseMapper extends Mapper<IPlatformVariationsResponseEntity, IPlatformVariationsResponseDTO> {

    private static instance: PlatformVariationsResponseMapper;
    private currencyLoginResponseMapper = InjectionPlatformBusinessAuthMapper.CurrencyLoginResponseMapper()
    private locationLoginResponseMapper = InjectionPlatformBusinessAuthMapper.LocationLoginResponseMapper()
    private languageLoginResponseMapper = InjectionPlatformBusinessAuthMapper.LanguageLoginResponseMapper()
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