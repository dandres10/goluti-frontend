import { UseCase } from "../../../../../core/interfaces/use-case";
import { IPlatformReduxDTO } from "../../../../models/redux/bus/platform";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";


export class ListenerUpdatePlatformEventUseCase implements UseCase<Function, void> {

    private static instance: ListenerUpdatePlatformEventUseCase;
    private platformEventRepository = InjectionEventRepository.PlatformEventRepository();

    public static getInstance(): ListenerUpdatePlatformEventUseCase {
        if (!ListenerUpdatePlatformEventUseCase.instance)
            ListenerUpdatePlatformEventUseCase.instance = new ListenerUpdatePlatformEventUseCase();
        return ListenerUpdatePlatformEventUseCase.instance;
    }

    public execute(callback: (message: IPlatformReduxDTO) => void): void {
        this.platformEventRepository.listenerUpdatePlatformEvent((message: IPlatformReduxDTO) => callback(message));
    }
}

