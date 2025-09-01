
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";
import { IUiReduxDTO } from "@/bus/domain/models/redux/bus/ui/i-ui-redux-dto";


export class ListenerUpdateTopIdMenuEventUseCase implements UseCase<Function, void> {

    private static instance: ListenerUpdateTopIdMenuEventUseCase;
    private uIEventRepository = InjectionEventRepository.UiEventRepository();

    public static getInstance(): ListenerUpdateTopIdMenuEventUseCase {
        if (!ListenerUpdateTopIdMenuEventUseCase.instance)
            ListenerUpdateTopIdMenuEventUseCase.instance = new ListenerUpdateTopIdMenuEventUseCase();
        return ListenerUpdateTopIdMenuEventUseCase.instance;
    }

    public execute(callback: (message: IUiReduxDTO) => void): void {
        this.uIEventRepository.listenerUpdateTopIdMenuEvent((message: IUiReduxDTO) => callback(message));
    }
}

