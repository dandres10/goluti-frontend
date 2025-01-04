
import { IPlatformReduxDTO } from "../../domain/models/redux/bus/platform";
import { InjectionPlatformEventUseCase } from "../../domain/services/use_cases/event/injection/injection-platform-event-use-case";

export class PlatformEventFacade {
    private static instance: PlatformEventFacade;
    private listenerUpdatePlatformEventUseCase = InjectionPlatformEventUseCase.ListenerUpdatePlatformEventUseCase();
    private listenerLogoutEventUseCase =
        InjectionPlatformEventUseCase.ListenerLogoutEventUseCase();
    private dispatchLogoutEventUseCase =
        InjectionPlatformEventUseCase.DispatchLogoutEventUseCase();
    private createLogoutEventUseCase =
        InjectionPlatformEventUseCase.CreateLogoutEventUseCase();


    public static getInstance(): PlatformEventFacade {
        if (!PlatformEventFacade.instance)
            PlatformEventFacade.instance = new PlatformEventFacade();
        return PlatformEventFacade.instance;
    }


    public listenerUpdatePlatformEvent(callback: (message: IPlatformReduxDTO) => void): void {
        this.listenerUpdatePlatformEventUseCase.execute(callback);
    }

    public listenerLogoutEvent(callback: () => void): void {
        this.listenerLogoutEventUseCase.execute(callback);
    }

    public dispatchLogoutEvent(): void {
        this.dispatchLogoutEventUseCase.execute();
    }

    public createLogoutEvent(): CustomEvent {
        return this.createLogoutEventUseCase.execute();
    }
}