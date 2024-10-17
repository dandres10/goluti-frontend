import { IConfigDTO } from "../../../../../core/interfaces";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionPlatformSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-platform-session-repository";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";


export class ReadPlatformUseCase implements UseCase<IConfigDTO, IPlatformReduxDTO | null> {

    private static instance: ReadPlatformUseCase;
    private platformSessionRepository = InjectionPlatformSessionRepository.PlatformSessionRepository();


    public static getInstance(): ReadPlatformUseCase {
        if (!ReadPlatformUseCase.instance)
            ReadPlatformUseCase.instance = new ReadPlatformUseCase();
        return ReadPlatformUseCase.instance;
    }

    public execute(
        config: IConfigDTO
    ): IPlatformReduxDTO | null {
        return this.platformSessionRepository.readPlatform(config)
    }
}

