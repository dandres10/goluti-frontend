import { UseCase } from "../../../../../core/interfaces/use-case";
import { IPlatformReduxDTO } from "../../../../models/redux/bus/platform";
import { InjectionEventRepository } from "../../../../../infrastructure/repositories/event/injection/injection-event-repository";


export class DispatchUpdatePlatformEventUseCase implements UseCase<IPlatformReduxDTO, void> {

    private static instance: DispatchUpdatePlatformEventUseCase;
    private platformEventRepository = InjectionEventRepository.PlatformEventRepository();

    public static getInstance(): DispatchUpdatePlatformEventUseCase {
        if (!DispatchUpdatePlatformEventUseCase.instance)
            DispatchUpdatePlatformEventUseCase.instance = new DispatchUpdatePlatformEventUseCase();
        return DispatchUpdatePlatformEventUseCase.instance;
    }

    public execute(param: IPlatformReduxDTO): void {
        this.platformEventRepository.dispatchUpdatePlatformEvent(param);
    }
}

