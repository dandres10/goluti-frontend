
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";
import { IUiReduxDTO } from "../../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionUiSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-ui-session-repository";
import { KEYS_SESSION } from "../../../../../core/const/keys-session";
import { KEYS_SESSION_ENUM } from "@/bus/core/enums/keys-session-enum";

export class DispatchUpdateTopIdMenuEventUseCase implements UseCase<IUiReduxDTO, void> {

    private static instance: DispatchUpdateTopIdMenuEventUseCase;
    private uIEventRepository = InjectionEventRepository.UiEventRepository();
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository()

    public static getInstance(): DispatchUpdateTopIdMenuEventUseCase {
        if (!DispatchUpdateTopIdMenuEventUseCase.instance)
            DispatchUpdateTopIdMenuEventUseCase.instance = new DispatchUpdateTopIdMenuEventUseCase();
        return DispatchUpdateTopIdMenuEventUseCase.instance;
    }

    public execute(param: IUiReduxDTO): void {
        const ui = this.uISessionRepository.readTopIdMenu({ key: KEYS_SESSION.UI as KEYS_SESSION_ENUM | undefined });
        this.uISessionRepository.updateTopIdMenu({ ...ui, ...param }, { key: KEYS_SESSION.UI as KEYS_SESSION_ENUM | undefined })
        this.uIEventRepository.dispatchUpdateTopIdMenuEvent(param);
    }
}

