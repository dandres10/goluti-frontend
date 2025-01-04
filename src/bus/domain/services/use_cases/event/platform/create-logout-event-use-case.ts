import { UseCase } from "@bus/core/interfaces/use-case";
import { InjectionEventRepository } from "@bus/infrastructure/repositories/event/injection/injection-event-repository";

export class CreateLogoutEventUseCase implements UseCase<void, CustomEvent> {
  private static instance: CreateLogoutEventUseCase;
  private platformEventRepository =
    InjectionEventRepository.PlatformEventRepository();

  public static getInstance(): CreateLogoutEventUseCase {
    if (!CreateLogoutEventUseCase.instance)
      CreateLogoutEventUseCase.instance = new CreateLogoutEventUseCase();
    return CreateLogoutEventUseCase.instance;
  }

  public execute(): CustomEvent {
    return this.platformEventRepository.createLogoutEvent();
  }
}
