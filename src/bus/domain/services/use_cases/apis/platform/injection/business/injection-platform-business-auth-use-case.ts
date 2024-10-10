import { LoginUseCase } from "../../business/auth/login-use-case";

export class InjectionPlatformBusinessAuthUseCase {
    public static LoginUseCase() { return LoginUseCase.getInstance() }
}