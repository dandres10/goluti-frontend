import { IConfigDTO } from "../../../../../core/interfaces";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { InjectionUiSessionRepository } from "../../../../../infrastructure/repositories/session/injection/injection-ui-session-repository";
import { InjectionUiEventUseCase } from "../../event/injection/injection-ui-event-use-case";
import { IUiReduxDTO } from "../../../../models/redux/bus/ui/i-ui-redux-dto";
import { NAVBAR_TYPE } from "@/bus/shared/enums";


export class UpdateTopIdMenuUseCase implements UseCase<IUiReduxDTO, void> {

    private static instance: UpdateTopIdMenuUseCase;
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository();
    /*    private dispatchUpdateNavbarEventUseCase = InjectionUiEventUseCase.DispatchUpdateNavbarEventUseCase(); */

    public static getInstance(): UpdateTopIdMenuUseCase {
        if (!UpdateTopIdMenuUseCase.instance)
            UpdateTopIdMenuUseCase.instance = new UpdateTopIdMenuUseCase();
        return UpdateTopIdMenuUseCase.instance;
    }

    public execute(
        param: IUiReduxDTO,
        config: IConfigDTO
    ): void {
        /*  this.dispatchUpdateNavbarEventUseCase.execute({ typeNavbar: param?.typeNavbar ?? NAVBAR_TYPE.HOME }); */
        this.uISessionRepository.updateTopIdMenu(param, config);
    }
}

