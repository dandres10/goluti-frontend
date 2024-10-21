import { LoginUseCase } from "../../business/auth/login-use-case";
import { LogoutUseCase } from "../../business/auth/logout-use-case";
import { RefreshTokenUseCase } from "../../business/auth/refresh-token-use-case";

export class InjectionPlatformBusinessAuthUseCase {
    public static LoginUseCase() { return LoginUseCase.getInstance() }
    public static RefreshTokenUseCase() { return RefreshTokenUseCase.getInstance() }
    public static LogoutUseCase() { return LogoutUseCase.getInstance() }
}