

import { IUiReduxDTO } from "../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionUiEventUseCase } from "../../domain/services/use_cases/event/injection/injection-ui-event-use-case";

export class UiEventFacade {
    private static instance: UiEventFacade;
    private listenerUpdateNavbarEventUseCase = InjectionUiEventUseCase.ListenerUpdateNavbarEventUseCase();
    private createUpdateNavbarEventUseCase = InjectionUiEventUseCase.CreateUpdateNavbarEventUseCase();
    private dispatchUpdateNavbarEventUseCase = InjectionUiEventUseCase.DispatchUpdateNavbarEventUseCase();


    public static getInstance(): UiEventFacade {
        if (!UiEventFacade.instance)
            UiEventFacade.instance = new UiEventFacade();
        return UiEventFacade.instance;
    }


    public listenerUpdateNavbarEvent(callback: (message: IUiReduxDTO) => void): void {
        this.listenerUpdateNavbarEventUseCase.execute(callback);
    }

    public createUpdateNavbarEvent(param: IUiReduxDTO): void {
        this.createUpdateNavbarEventUseCase.execute(param);
    }
    public dispatchUpdateNavbarEvent(param: IUiReduxDTO): void {
        this.dispatchUpdateNavbarEventUseCase.execute(param);
    }
}