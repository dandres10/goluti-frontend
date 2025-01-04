import { UseCase } from "@bus/core/interfaces/use-case";
import { InjectionEventRepository } from "@bus/infrastructure/repositories/event/injection/injection-event-repository";

export class DispatchLogoutEventUseCase implements UseCase<void, void> {
  private static instance: DispatchLogoutEventUseCase;
  private platformEventRepository =
    InjectionEventRepository.PlatformEventRepository();

  public static getInstance(): DispatchLogoutEventUseCase {
    if (!DispatchLogoutEventUseCase.instance)
      DispatchLogoutEventUseCase.instance = new DispatchLogoutEventUseCase();
    return DispatchLogoutEventUseCase.instance;
  }

  public execute(): void {
    this.platformEventRepository.dispatchLogoutEvent();
  }
}
