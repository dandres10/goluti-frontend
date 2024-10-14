import { Mapper } from "@/bus/core/classes";
import { IPlatformInitialReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { IPlatformLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";


export class PlatformInitialReduxMapper extends Mapper<IPlatformLoginResponseDTO, IPlatformInitialReduxDTO> {

    private static instance: PlatformInitialReduxMapper;
    public constructor() { super(); }


    public static getInstance(): PlatformInitialReduxMapper {
        if (!PlatformInitialReduxMapper.instance)
            PlatformInitialReduxMapper.instance = new PlatformInitialReduxMapper();
        return PlatformInitialReduxMapper.instance;
    }

    mapFrom(param: IPlatformLoginResponseDTO): IPlatformInitialReduxDTO {
        return {
            id: param.id,
            languageId: param.languageId,
            locationId: param.locationId,
            tokenExpirationMinutes: param.tokenExpirationMinutes,
            currencyId: param.currencyId
        }
    }

    mapFromList(params: IPlatformLoginResponseDTO[]): IPlatformInitialReduxDTO[] {
        return params.map((param: IPlatformLoginResponseDTO) => {
            return this.mapFrom(param)
        })
    }

    mapTo(param: IPlatformInitialReduxDTO): IPlatformLoginResponseDTO {
        return {
            id: param.id,
            languageId: param.languageId,
            locationId: param.locationId,
            tokenExpirationMinutes: param.tokenExpirationMinutes,
            currencyId: param.currencyId
        }
    }

    mapToList(params: IPlatformInitialReduxDTO[]): IPlatformLoginResponseDTO[] {
        return params.map((param: IPlatformInitialReduxDTO) => {
            return this.mapTo(param);
        })
    }

}