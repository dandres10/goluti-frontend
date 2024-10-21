import { Mapper } from "../../../../../../../core/classes";
import { ILogoutResponseEntity } from "../../../../../../../infrastructure/entities/apis/platform/business/auth/logout";
import { ILogoutResponseDTO } from "../../../../../../../domain/models/apis/platform/business/auth/logout/i-logout-response-dto";

export class LogoutResponseMapper extends Mapper<ILogoutResponseEntity, ILogoutResponseDTO> {

    private static instance: LogoutResponseMapper;
    public constructor() { super(); }


    public static getInstance(): LogoutResponseMapper {
        if (!LogoutResponseMapper.instance)
            LogoutResponseMapper.instance = new LogoutResponseMapper();
        return LogoutResponseMapper.instance;
    }

    public mapFrom(param: ILogoutResponseEntity): ILogoutResponseDTO {
        return {
            message: param.message
        }
    }

    public mapFromList(params: ILogoutResponseEntity[]): ILogoutResponseDTO[] {
        return params.map((param: ILogoutResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ILogoutResponseDTO): ILogoutResponseEntity {
        return {
            message: param.message
        }
    }

    public mapToList(params: ILogoutResponseDTO[]): ILogoutResponseEntity[] {
        return params.map((param: ILogoutResponseDTO) => {
            return this.mapTo(param);
        })
    }

}