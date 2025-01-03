import { UseCase } from "@bus/core/interfaces/use-case";
import { InjectionPlatformReduxMapper } from "@bus/infrastructure/mappers/redux/injection";
import { IAuthLoginResponseDTO } from "@bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformEventUseCase } from "@bus/domain/services/use_cases/event/injection/injection-platform-event-use-case";
import { InjectionPlatformSessionRepository } from "@bus/infrastructure/repositories/session/injection/injection-platform-session-repository";


export class SavePlatformUseCase implements UseCase<IAuthLoginResponseDTO, void> {

    private static instance: SavePlatformUseCase;
    private platformReduxMapper = InjectionPlatformReduxMapper.PlatformReduxMapper();
    private platformSessionRepository = InjectionPlatformSessionRepository.PlatformSessionRepository();
    private dispatchUpdatePlatformEventUseCase = InjectionPlatformEventUseCase.DispatchUpdatePlatformEventUseCase();

    public static getInstance(): SavePlatformUseCase {
        if (!SavePlatformUseCase.instance)
            SavePlatformUseCase.instance = new SavePlatformUseCase();
        return SavePlatformUseCase.instance;
    }

    public execute(
        param: IAuthLoginResponseDTO
    ): void {
        const data = this.platformReduxMapper.mapFrom(param)
        this.dispatchUpdatePlatformEventUseCase.execute(data);
        this.platformSessionRepository.savePlatform(data);
    }
}

