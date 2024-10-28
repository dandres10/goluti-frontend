
import { IConfigDTO } from "../../core/interfaces";
import { IUiReduxDTO } from "../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionUiSessionUseCase } from "../../../bus/domain/services/use_cases/session/injection/injection-ui-session-use.case";

export class UiSessionFacade {
    private static instance: UiSessionFacade;
    private updateNavbarTypeUseCase = InjectionUiSessionUseCase.UpdateNavbarTypeUseCase();
    private readNavbarTypeUseCase = InjectionUiSessionUseCase.ReadNavbarTypeUseCase();


    public static getInstance(): UiSessionFacade {
        if (!UiSessionFacade.instance)
            UiSessionFacade.instance = new UiSessionFacade();
        return UiSessionFacade.instance;
    }


    public updateNavbarType(params: IUiReduxDTO, config: IConfigDTO): void {
        this.updateNavbarTypeUseCase.execute(params, config);
    }

    public readNavbarType(config: IConfigDTO): IUiReduxDTO | null {
        return this.readNavbarTypeUseCase.execute(config);
    }





}