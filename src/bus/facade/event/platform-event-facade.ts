
import { IPlatformReduxDTO } from "../../domain/models/redux/bus/platform";
import { InjectionPlatformEventUseCase } from "../../domain/services/use_cases/event/injection/injection-platform-event-use-case";

export class PlatformEventFacade {
    private static instance: PlatformEventFacade;
    private listenerUpdatePlatformEventUseCase = InjectionPlatformEventUseCase.ListenerUpdatePlatformEventUseCase();


    public static getInstance(): PlatformEventFacade {
        if (!PlatformEventFacade.instance)
            PlatformEventFacade.instance = new PlatformEventFacade();
        return PlatformEventFacade.instance;
    }


    public listenerUpdatePlatformEvent(callback: (message: IPlatformReduxDTO) => void): void {
        this.listenerUpdatePlatformEventUseCase.execute(callback);
    }
}