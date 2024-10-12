import { Mapper } from "@/bus/core/classes";
import { InjectionPlatformReduxMapper } from "../injection";
import { IVariationsReduxDTO } from "@/bus/domain/models/redux/platform";
import { IPlatformVariationsResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class VariationsReduxMapper extends Mapper<IPlatformVariationsResponseDTO, IVariationsReduxDTO> {

    private static instance: VariationsReduxMapper;
    private currencyReduxMapper = InjectionPlatformReduxMapper.CurrencyReduxMapper()
    private locationReduxMapper = InjectionPlatformReduxMapper.LocationReduxMapper()
    private languageReduxMapper = InjectionPlatformReduxMapper.LanguageReduxMapper()
    private constructor() {
        super();
    }


    public static getInstance(): VariationsReduxMapper {
        if (!VariationsReduxMapper.instance)
            VariationsReduxMapper.instance = new VariationsReduxMapper();
        return VariationsReduxMapper.instance;
    }

    mapFrom(param: IPlatformVariationsResponseDTO): IVariationsReduxDTO {
        return {
            currencies: this.currencyReduxMapper.mapFromList(param.currencies),
            locations: this.locationReduxMapper.mapFromList(param.locations),
            languages: this.languageReduxMapper.mapFromList(param.languages)
        }
    }

    mapFromList(params: IPlatformVariationsResponseDTO[]): IVariationsReduxDTO[] {
        return params.map((param: IPlatformVariationsResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IVariationsReduxDTO): IPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyReduxMapper.mapToList(param.currencies),
            locations: this.locationReduxMapper.mapToList(param.locations),
            languages: this.languageReduxMapper.mapToList(param.languages)
        }
    }

    mapToList(params: IVariationsReduxDTO[]): IPlatformVariationsResponseDTO[] {
        return params.map((param: IVariationsReduxDTO) => {
            return this.mapTo(param);
        })
    }

}