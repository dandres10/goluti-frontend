import { NAVBAR_TYPE } from "../../../../../shared/enums";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";
import { InjectionUiSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-ui-session-repository";
import { KEYS_SESSION } from "../../../../../core/const/keys-session";
import { IUiReduxDTO } from "../../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";


export class CreateUpdateNavbarEventUseCase implements UseCase<IUiReduxDTO, CustomEvent<{ message: NAVBAR_TYPE | null }>> {

    private static instance: CreateUpdateNavbarEventUseCase;
    private uiEventRepository = InjectionEventRepository.UiEventRepository();
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository()

    public static getInstance(): CreateUpdateNavbarEventUseCase {
        if (!CreateUpdateNavbarEventUseCase.instance)
            CreateUpdateNavbarEventUseCase.instance = new CreateUpdateNavbarEventUseCase();
        return CreateUpdateNavbarEventUseCase.instance;
    }

    public execute(param: IUiReduxDTO): CustomEvent<{ message: IUiReduxDTO }> {

        this.uISessionRepository.updateNavbarType(param, { key: KEYS_SESSION.UI })

        return this.uiEventRepository.createUpdateNavbarTypeEvent(param);
    }
}

