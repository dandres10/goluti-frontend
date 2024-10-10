import { SavePlatformUseCase } from "@/bus/domain/services/use_cases/redux/save-platform-use-case";


export class PlatformReduxFacade {
    private static instance: PlatformReduxFacade;
    private savePlatformUseCase = SavePlatformUseCase.getInstance();


    public static getInstance(): PlatformReduxFacade {
        if (!PlatformReduxFacade.instance)
            PlatformReduxFacade.instance = new PlatformReduxFacade();
        return PlatformReduxFacade.instance;
    }


    public savePlatform(params: any): void {
        this.savePlatformUseCase.execute(params);

    }


}