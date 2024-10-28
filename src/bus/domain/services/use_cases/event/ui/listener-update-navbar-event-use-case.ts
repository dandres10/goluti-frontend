
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";
import { IUiReduxDTO } from "@/bus/domain/models/redux/bus/ui/i-ui-redux-dto";


export class ListenerUpdateNavbarEventUseCase implements UseCase<Function, void> {

    private static instance: ListenerUpdateNavbarEventUseCase;
    private uIEventRepository = InjectionEventRepository.UiEventRepository();

    public static getInstance(): ListenerUpdateNavbarEventUseCase {
        if (!ListenerUpdateNavbarEventUseCase.instance)
            ListenerUpdateNavbarEventUseCase.instance = new ListenerUpdateNavbarEventUseCase();
        return ListenerUpdateNavbarEventUseCase.instance;
    }

    public execute(callback: (message: IUiReduxDTO) => void): void {
        this.uIEventRepository.listenerUpdateNavbarTypeEvent((message: IUiReduxDTO) => callback(message));
    }
}

