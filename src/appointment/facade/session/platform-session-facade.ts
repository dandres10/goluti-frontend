
import { IConfigDTO } from "../../core/interfaces";
import { IAuthLoginResponseDTO } from "../../domain/models/apis/platform/business/auth/login";
import { InjectionPlatformSessionUseCase } from "../../domain/services/use_cases/session/injection/injection-platform-session-use.case";

export class PlatformSessionFacade {
    private static instance: PlatformSessionFacade;
    private savePlatformUseCase = InjectionPlatformSessionUseCase.SavePlatformUseCase();


    public static getInstance(): PlatformSessionFacade {
        if (!PlatformSessionFacade.instance)
            PlatformSessionFacade.instance = new PlatformSessionFacade();
        return PlatformSessionFacade.instance;
    }


    public savePlatform(params: IAuthLoginResponseDTO, config: IConfigDTO): void {
        this.savePlatformUseCase.execute(params, config);
    }





}