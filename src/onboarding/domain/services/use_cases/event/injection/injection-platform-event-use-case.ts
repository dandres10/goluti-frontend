import {
    CreateUpdatePlatformEventUseCase,
    DispatchUpdatePlatformEventUseCase,
    ListenerUpdatePlatformEventUseCase
} from "../platform";

export class InjectionPlatformEventUseCase {
    public static CreateUpdatePlatformEventUseCase() { return CreateUpdatePlatformEventUseCase.getInstance() }
    public static ListenerUpdatePlatformEventUseCase() { return ListenerUpdatePlatformEventUseCase.getInstance() }
    public static DispatchUpdatePlatformEventUseCase() { return DispatchUpdatePlatformEventUseCase.getInstance() }
}