import { ReadPlatformUseCase } from "@bus/domain/services/use_cases/session/platform/read-platform-use-case";
import { SavePlatformUseCase } from "@bus/domain/services/use_cases/session/platform/save-platform-use-case";
import { DeleteSessionUseCase } from "@bus/domain/services/use_cases/session/platform/delete-session-use-case";


export class InjectionPlatformSessionUseCase {
    public static SavePlatformUseCase() { return SavePlatformUseCase.getInstance() }
    public static ReadPlatformUseCase() { return ReadPlatformUseCase.getInstance() }
    public static DeleteSessionUseCase() { return DeleteSessionUseCase.getInstance() }

}