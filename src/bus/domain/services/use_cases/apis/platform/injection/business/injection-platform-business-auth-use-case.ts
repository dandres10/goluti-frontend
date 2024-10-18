import { LoginUseCase } from "../../business/auth/login-use-case";
import { RefreshTokenUseCase } from "../../business/auth/refresh-token-use-case";

export class InjectionPlatformBusinessAuthUseCase {
    public static LoginUseCase() { return LoginUseCase.getInstance() }
    public static RefreshTokenUseCase() { return RefreshTokenUseCase.getInstance() }
}