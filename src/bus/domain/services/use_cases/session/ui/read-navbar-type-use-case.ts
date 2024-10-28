
import { IConfigDTO } from "../../../../../core/interfaces";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { IUiReduxDTO } from "../../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionUiSessionRepository } from "../../../../../../bus/infrastructure/repositories/session/injection/injection-ui-session-repository";


export class ReadNavbarTypeUseCase implements UseCase<IConfigDTO, IUiReduxDTO | null> {

    private static instance: ReadNavbarTypeUseCase;
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository();


    public static getInstance(): ReadNavbarTypeUseCase {
        if (!ReadNavbarTypeUseCase.instance)
            ReadNavbarTypeUseCase.instance = new ReadNavbarTypeUseCase();
        return ReadNavbarTypeUseCase.instance;
    }

    public execute(
        config: IConfigDTO
    ): IUiReduxDTO | null {
        return this.uISessionRepository.readNavbarType(config)
    }
}

