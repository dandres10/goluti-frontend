import { ReadUserUseCase, UpdatePlatformUseCase } from "../bus/platform";

export class InjectionPlatformReduxUseCase {
    public static UpdatePlatformUseCase() { return UpdatePlatformUseCase.getInstance() }
    public static ReadUserUseCase() { return ReadUserUseCase.getInstance() }
}