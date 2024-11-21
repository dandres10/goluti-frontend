import { ReadPlatformUseCase } from "../platform/read-platform-use-case";
import { SavePlatformUseCase } from "../platform/save-platform-use-case";


export class InjectionPlatformSessionUseCase {
    public static SavePlatformUseCase() { return SavePlatformUseCase.getInstance() }
    public static ReadPlatformUseCase() { return ReadPlatformUseCase.getInstance() }
    
}