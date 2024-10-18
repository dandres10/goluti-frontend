import { IConfigDTO } from "../../../../../core/interfaces";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionPlatformReduxMapper } from "../../../../../infrastructure/mappers/redux/injection";
import { IAuthLoginResponseDTO } from "../../../../../domain/models/apis/platform/business/auth/login";
import { InjectionPlatformEventUseCase } from "../../event/injection/injection-platform-event-use-case";
import { InjectionPlatformSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-platform-session-repository";


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
        param: IAuthLoginResponseDTO,
        config: IConfigDTO
    ): void {
        const data = this.platformReduxMapper.mapFrom(param)
        setTimeout(() => {
            this.dispatchUpdatePlatformEventUseCase.execute(data);
        }, 3000);
        this.platformSessionRepository.savePlatform(data, config)
    }
}

