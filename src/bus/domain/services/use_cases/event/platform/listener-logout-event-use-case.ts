import { UseCase } from "@bus/core/interfaces/use-case";
import { InjectionEventRepository } from "@bus/infrastructure/repositories/event/injection/injection-event-repository";

export class ListenerLogoutEventUseCase implements UseCase<Function, void> {
  private static instance: ListenerLogoutEventUseCase;
  private platformEventRepository =
    InjectionEventRepository.PlatformEventRepository();

  public static getInstance(): ListenerLogoutEventUseCase {
    if (!ListenerLogoutEventUseCase.instance)
      ListenerLogoutEventUseCase.instance = new ListenerLogoutEventUseCase();
    return ListenerLogoutEventUseCase.instance;
  }

  public execute(callback: () => void): void {
    this.platformEventRepository.listenerLogoutEvent(() => callback());
  }
}
