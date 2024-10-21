import { RefreshTokenResponseMapper } from "../../business/auth/refresh-token/index";


export class InjectionRefreshTokenMapper {
    public static RefreshTokenResponseMapper() { return RefreshTokenResponseMapper.getInstance() }
}