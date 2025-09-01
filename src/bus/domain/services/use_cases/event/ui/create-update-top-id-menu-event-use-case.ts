import { NAVBAR_TYPE } from "../../../../../shared/enums";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";
import { InjectionUiSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-ui-session-repository";
import { KEYS_SESSION } from "../../../../../core/const/keys-session";
import { IUiReduxDTO } from "../../../../models/redux/bus/ui/i-ui-redux-dto";
import { KEYS_SESSION_ENUM } from "@/bus/core/enums/keys-session-enum";


export class CreateUpdateTopIdMenuEventUseCase implements UseCase<IUiReduxDTO, CustomEvent<{ message: NAVBAR_TYPE | null }>> {

    private static instance: CreateUpdateTopIdMenuEventUseCase;
    private uiEventRepository = InjectionEventRepository.UiEventRepository();
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository()

    public static getInstance(): CreateUpdateTopIdMenuEventUseCase {
        if (!CreateUpdateTopIdMenuEventUseCase.instance)
            CreateUpdateTopIdMenuEventUseCase.instance = new CreateUpdateTopIdMenuEventUseCase();
        return CreateUpdateTopIdMenuEventUseCase.instance;
    }

    public execute(param: IUiReduxDTO): CustomEvent<{ message: IUiReduxDTO }> {

        const ui: IUiReduxDTO | null = this.uISessionRepository.readTopIdMenu({
            key: KEYS_SESSION.UI as KEYS_SESSION_ENUM | undefined,
        });

        if (ui) {
            this.uISessionRepository.updateTopIdMenu(ui, { key: KEYS_SESSION.UI as KEYS_SESSION_ENUM | undefined })
            return this.uiEventRepository.createUpdateTopIdMenuEvent(ui);
        }
        this.uISessionRepository.updateTopIdMenu(param, { key: KEYS_SESSION.UI as KEYS_SESSION_ENUM | undefined })
        return this.uiEventRepository.createUpdateTopIdMenuEvent(param);
    }
}

