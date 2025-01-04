import { IConfigDTO } from "../../../core/interfaces";
import { IPlatformReduxDTO, IUserReduxDTO } from "../../../domain/models/redux/bus/platform";
import { InjectionPlatformReduxUseCase } from "../../../domain/services/use_cases/redux/injection";

export class PlatformReduxFacade {
    private static instance: PlatformReduxFacade;
    private updatePlatformUseCase = InjectionPlatformReduxUseCase.UpdatePlatformUseCase();
    private readUserUseCase = InjectionPlatformReduxUseCase.ReadUserUseCase();


    public static getInstance(): PlatformReduxFacade {
        if (!PlatformReduxFacade.instance)
            PlatformReduxFacade.instance = new PlatformReduxFacade();
        return PlatformReduxFacade.instance;
    }


    public updatePlatform(params: IPlatformReduxDTO|null, config: IConfigDTO): void {
        this.updatePlatformUseCase.execute(params,config);
    }

    public readUser(config: IConfigDTO): IUserReduxDTO | undefined {
        return this.readUserUseCase.execute(config)
    }




}