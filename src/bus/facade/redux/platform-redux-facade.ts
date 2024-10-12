import { IConfigDTO } from "../../core/interfaces";
import { IUserReduxDTO } from "../../domain/models/redux/platform";
import { IAuthLoginResponseDTO } from "../../domain/models/apis/platform/business/auth/login";
import { InjectionPlatformReduxUseCase } from "../../domain/services/use_cases/redux/injection";

export class PlatformReduxFacade {
    private static instance: PlatformReduxFacade;
    private savePlatformUseCase = InjectionPlatformReduxUseCase.SavePlatformUseCase();
    private readUserUseCase = InjectionPlatformReduxUseCase.ReadUserUseCase();


    public static getInstance(): PlatformReduxFacade {
        if (!PlatformReduxFacade.instance)
            PlatformReduxFacade.instance = new PlatformReduxFacade();
        return PlatformReduxFacade.instance;
    }


    public savePlatform(params: IAuthLoginResponseDTO, config: IConfigDTO): void {
        this.savePlatformUseCase.execute(params,config);
    }

    public readUser(config: IConfigDTO): IUserReduxDTO | undefined {
        return this.readUserUseCase.execute(config)
    }




}