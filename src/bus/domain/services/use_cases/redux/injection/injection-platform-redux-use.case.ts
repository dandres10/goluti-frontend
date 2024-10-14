import { ReadUserUseCase, SavePlatformUseCase } from "../bus/platform";

export class InjectionPlatformReduxUseCase {
    public static SavePlatformUseCase() { return SavePlatformUseCase.getInstance() }
    public static ReadUserUseCase() { return ReadUserUseCase.getInstance() }
}