import { IConfigDTO } from "../../../../../core/interfaces";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionUiSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-ui-session-repository";
import { InjectionUiEventUseCase } from "../../event/injection/injection-ui-event-use-case";
import { IUiReduxDTO } from "../../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";


export class UpdateNavbarTypeUseCase implements UseCase<IUiReduxDTO, void> {

    private static instance: UpdateNavbarTypeUseCase;
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository();
    private dispatchUpdateNavbarEventUseCase = InjectionUiEventUseCase.DispatchUpdateNavbarEventUseCase();

    public static getInstance(): UpdateNavbarTypeUseCase {
        if (!UpdateNavbarTypeUseCase.instance)
            UpdateNavbarTypeUseCase.instance = new UpdateNavbarTypeUseCase();
        return UpdateNavbarTypeUseCase.instance;
    }

    public execute(
        param: IUiReduxDTO,
        config: IConfigDTO
    ): void {
        this.dispatchUpdateNavbarEventUseCase.execute(param.typeNavbar);
        this.uISessionRepository.updateNavbarType(param, config);
    }
}

