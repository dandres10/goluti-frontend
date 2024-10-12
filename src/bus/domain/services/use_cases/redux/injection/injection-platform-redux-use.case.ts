import { ReadUserUseCase, SavePlatformUseCase } from "../platform";

export class InjectionPlatformReduxUseCase {
    public static SavePlatformUseCase() { return SavePlatformUseCase.getInstance() }
    public static ReadUserUseCase() { return ReadUserUseCase.getInstance() }
}