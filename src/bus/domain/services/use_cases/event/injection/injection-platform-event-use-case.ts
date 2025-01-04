import {
    CreateLogoutEventUseCase,
    CreateUpdatePlatformEventUseCase,
    DispatchLogoutEventUseCase,
    DispatchUpdatePlatformEventUseCase,
    ListenerLogoutEventUseCase,
    ListenerUpdatePlatformEventUseCase
} from "@bus/domain/services/use_cases/event/platform";

export class InjectionPlatformEventUseCase {
    public static CreateUpdatePlatformEventUseCase() { return CreateUpdatePlatformEventUseCase.getInstance() }
    public static ListenerUpdatePlatformEventUseCase() { return ListenerUpdatePlatformEventUseCase.getInstance() }
    public static DispatchUpdatePlatformEventUseCase() { return DispatchUpdatePlatformEventUseCase.getInstance() }
    public static CreateLogoutEventUseCase() {
        return CreateLogoutEventUseCase.getInstance();
    }
    public static ListenerLogoutEventUseCase() {
        return ListenerLogoutEventUseCase.getInstance();
    }
    public static DispatchLogoutEventUseCase() {
        return DispatchLogoutEventUseCase.getInstance();
    }
}