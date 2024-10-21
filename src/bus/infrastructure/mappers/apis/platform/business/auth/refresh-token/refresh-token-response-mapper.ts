import { Mapper } from "../../../../../../../core/classes";
import { IAuthLoginResponseDTO } from "../../../../../../../domain/models/apis/platform/business/auth/login";
import { IRefreshTokenResponseDTO } from "../../../../../../../domain/models/apis/platform/business/auth/refresh-token";
import { IRefreshTokenResponseEntity } from "../../../../../../../infrastructure/entities/apis/platform/business/auth/refresh-token";

export class RefreshTokenResponseMapper extends Mapper<IRefreshTokenResponseEntity, IRefreshTokenResponseDTO> {

    private static instance: RefreshTokenResponseMapper;
    public constructor() { super(); }


    public static getInstance(): RefreshTokenResponseMapper {
        if (!RefreshTokenResponseMapper.instance)
            RefreshTokenResponseMapper.instance = new RefreshTokenResponseMapper();
        return RefreshTokenResponseMapper.instance;
    }

    public mapFrom(param: IRefreshTokenResponseEntity): IRefreshTokenResponseDTO {
        return {
            token: param.token
        }
    }

    public mapFromList(params: IRefreshTokenResponseEntity[]): IRefreshTokenResponseDTO[] {
        return params.map((param: IRefreshTokenResponseEntity) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: IRefreshTokenResponseDTO): IRefreshTokenResponseEntity {
        return {
            token: param.token
        }
    }

    public mapToList(params: IRefreshTokenResponseDTO[]): IRefreshTokenResponseEntity[] {
        return params.map((param: IRefreshTokenResponseDTO) => {
            return this.mapTo(param);
        })
    }

}