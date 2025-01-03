
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { IAuthLoginResponseDTO } from "@bus/domain/models/apis/platform/business/auth/login";
import { InjectionPlatformSessionUseCase } from "@bus/domain/services/use_cases/session/injection/injection-platform-session-use.case";

export class PlatformSessionFacade {
    private static instance: PlatformSessionFacade;
    private savePlatformUseCase = InjectionPlatformSessionUseCase.SavePlatformUseCase();
    private readPlatformUseCase = InjectionPlatformSessionUseCase.ReadPlatformUseCase();


    public static getInstance(): PlatformSessionFacade {
        if (!PlatformSessionFacade.instance)
            PlatformSessionFacade.instance = new PlatformSessionFacade();
        return PlatformSessionFacade.instance;
    }


    public savePlatform(params: IAuthLoginResponseDTO): void {
        this.savePlatformUseCase.execute(params);
    }

    public readPlatform(): IPlatformReduxDTO | null {
        return this.readPlatformUseCase.execute();
    }





}