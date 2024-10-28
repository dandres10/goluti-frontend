
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";
import { IUiReduxDTO } from "../../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionUiSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-ui-session-repository";
import { KEYS_SESSION } from "../../../../../core/const/keys-session";

export class DispatchUpdateNavbarEventUseCase implements UseCase<IUiReduxDTO, void> {

    private static instance: DispatchUpdateNavbarEventUseCase;
    private uIEventRepository = InjectionEventRepository.UiEventRepository();
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository()

    public static getInstance(): DispatchUpdateNavbarEventUseCase {
        if (!DispatchUpdateNavbarEventUseCase.instance)
            DispatchUpdateNavbarEventUseCase.instance = new DispatchUpdateNavbarEventUseCase();
        return DispatchUpdateNavbarEventUseCase.instance;
    }

    public execute(param: IUiReduxDTO): void {
        this.uISessionRepository.updateNavbarType(param, { key: KEYS_SESSION.UI })
        this.uIEventRepository.dispatchUpdateNavbarTypeEvent(param);
    }
}

