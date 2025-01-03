import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IPlatformReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionPlatformSessionRepository } from "@bus/infrastructure/repositories/session/injection/injection-platform-session-repository";


export class ReadPlatformUseCase implements UseCase<IConfigDTO, IPlatformReduxDTO | null> {

    private static instance: ReadPlatformUseCase;
    private platformSessionRepository = InjectionPlatformSessionRepository.PlatformSessionRepository();


    public static getInstance(): ReadPlatformUseCase {
        if (!ReadPlatformUseCase.instance)
            ReadPlatformUseCase.instance = new ReadPlatformUseCase();
        return ReadPlatformUseCase.instance;
    }

    public execute(): IPlatformReduxDTO | null {
        return this.platformSessionRepository.readPlatform()
    }
}

