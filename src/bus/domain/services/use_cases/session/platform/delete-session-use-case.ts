import { UseCase } from "@bus/core/interfaces/use-case";
import { InjectionPlatformSessionRepository } from "@/bus/infrastructure/repositories/session/injection/injection-platform-session-repository";


export class DeleteSessionUseCase implements UseCase<void, void> {
  private static instance: DeleteSessionUseCase;
  private platformSessionRepository =
    InjectionPlatformSessionRepository.PlatformSessionRepository();

  public static getInstance(): DeleteSessionUseCase {
    if (!DeleteSessionUseCase.instance)
      DeleteSessionUseCase.instance = new DeleteSessionUseCase();
    return DeleteSessionUseCase.instance;
  }

  public execute(): void {
    this.platformSessionRepository.deleteSession();
  }
}
