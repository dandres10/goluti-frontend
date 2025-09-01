
import { IConfigDTO } from "../../../../../core/interfaces";
import { UseCase } from "../../../../../core/interfaces/use-case";
import { IUiReduxDTO } from "../../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { InjectionUiSessionRepository } from "../../../../../../bus/infrastructure/repositories/session/injection/injection-ui-session-repository";


export class ReadTopIdMenuUseCase implements UseCase<IConfigDTO, IUiReduxDTO | null> {

    private static instance: ReadTopIdMenuUseCase;
    private uISessionRepository = InjectionUiSessionRepository.UiSessionRepository();


    public static getInstance(): ReadTopIdMenuUseCase {
        if (!ReadTopIdMenuUseCase.instance)
            ReadTopIdMenuUseCase.instance = new ReadTopIdMenuUseCase();
        return ReadTopIdMenuUseCase.instance;
    }

    public execute(
        config: IConfigDTO
    ): IUiReduxDTO | null {
        return this.uISessionRepository.readTopIdMenu(config)
    }
}

