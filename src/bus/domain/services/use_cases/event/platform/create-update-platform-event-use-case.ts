


import { UseCase } from "../../../../../core/interfaces/use-case";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { InjectionEventRepository } from "@/bus/infrastructure/repositories/event/injection/injection-event-repository";




export class CreateUpdatePlatformEventUseCase implements UseCase<IPlatformReduxDTO | null, CustomEvent<{ message: IPlatformReduxDTO | null }>> {

    private static instance: CreateUpdatePlatformEventUseCase;
    private platformEventRepository = InjectionEventRepository.PlatformEventRepository();

    public static getInstance(): CreateUpdatePlatformEventUseCase {
        if (!CreateUpdatePlatformEventUseCase.instance)
            CreateUpdatePlatformEventUseCase.instance = new CreateUpdatePlatformEventUseCase();
        return CreateUpdatePlatformEventUseCase.instance;
    }

    public execute(param: IPlatformReduxDTO | null): CustomEvent<{ message: IPlatformReduxDTO | null }> {
        return this.platformEventRepository.createUpdatePlatformEvent(param);
    }
}

