import { Mapper } from "../../../../../core/classes";
import { InjectionPlatformReduxMapper } from "../../injection";
import { IVariationsReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IPlatformVariationsResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class VariationsReduxMapper extends Mapper<IPlatformVariationsResponseDTO, IVariationsReduxDTO> {

    private static instance: VariationsReduxMapper;
    private currencyReduxMapper = InjectionPlatformReduxMapper.CurrencyReduxMapper()
    private locationReduxMapper = InjectionPlatformReduxMapper.LocationReduxMapper()
    private languageReduxMapper = InjectionPlatformReduxMapper.LanguageReduxMapper()
    private companyReduxMapper = InjectionPlatformReduxMapper.CompanyReduxMapper()
    private constructor() {
        super();
    }


    public static getInstance(): VariationsReduxMapper {
        if (!VariationsReduxMapper.instance)
            VariationsReduxMapper.instance = new VariationsReduxMapper();
        return VariationsReduxMapper.instance;
    }

    public mapFrom(param: IPlatformVariationsResponseDTO): IVariationsReduxDTO {
        return {
            currencies: this.currencyReduxMapper.mapFromList(param.currencies),
            locations: this.locationReduxMapper.mapFromList(param.locations),
            languages: this.languageReduxMapper.mapFromList(param.languages),
            companies: this.companyReduxMapper.mapFromList(param.companies)
        }
    }

    public mapFromList(params: IPlatformVariationsResponseDTO[]): IVariationsReduxDTO[] {
        return params.map((param: IPlatformVariationsResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IVariationsReduxDTO): IPlatformVariationsResponseDTO {
        return {
            currencies: this.currencyReduxMapper.mapToList(param.currencies),
            locations: this.locationReduxMapper.mapToList(param.locations),
            languages: this.languageReduxMapper.mapToList(param.languages),
            companies: this.companyReduxMapper.mapToList(param.companies)
        }
    }

    public mapToList(params: IVariationsReduxDTO[]): IPlatformVariationsResponseDTO[] {
        return params.map((param: IVariationsReduxDTO) => {
            return this.mapTo(param);
        })
    }

}