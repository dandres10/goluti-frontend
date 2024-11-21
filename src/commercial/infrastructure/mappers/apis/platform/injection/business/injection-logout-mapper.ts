import { LogoutResponseMapper } from "../../business/auth/logout";


export class InjectionLogoutMapper {
    public static LogoutResponseMapper() { return LogoutResponseMapper.getInstance() }
}