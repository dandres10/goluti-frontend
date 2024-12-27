import { Mapper } from "../../../../../core/classes";
import { IPlatformInitialReduxDTO } from "../../../../../domain/models/redux/bus/platform";
import { IPlatformLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";


export class PlatformInitialReduxMapper extends Mapper<IPlatformLoginResponseDTO, IPlatformInitialReduxDTO> {

    private static instance: PlatformInitialReduxMapper;
    public constructor() { super(); }


    public static getInstance(): PlatformInitialReduxMapper {
        if (!PlatformInitialReduxMapper.instance)
            PlatformInitialReduxMapper.instance = new PlatformInitialReduxMapper();
        return PlatformInitialReduxMapper.instance;
    }

    public mapFrom(param: IPlatformLoginResponseDTO): IPlatformInitialReduxDTO {
        return {
            id: param.id,
            languageId: param.languageId,
            locationId: param.locationId,
            tokenExpirationMinutes: param.tokenExpirationMinutes,
            currencyId: param.currencyId
        }
    }

    public mapFromList(params: IPlatformLoginResponseDTO[]): IPlatformInitialReduxDTO[] {
        return params.map((param: IPlatformLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IPlatformInitialReduxDTO): IPlatformLoginResponseDTO {
        return {
            id: param.id,
            languageId: param.languageId,
            locationId: param.locationId,
            tokenExpirationMinutes: param.tokenExpirationMinutes,
            currencyId: param.currencyId
        }
    }

    public mapToList(params: IPlatformInitialReduxDTO[]): IPlatformLoginResponseDTO[] {
        return params.map((param: IPlatformInitialReduxDTO) => {
            return this.mapTo(param);
        })
    }

}