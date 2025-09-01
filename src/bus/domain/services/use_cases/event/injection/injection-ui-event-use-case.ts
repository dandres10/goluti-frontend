import {
    CreateUpdateNavbarEventUseCase,
    CreateUpdateTopIdMenuEventUseCase,
    DispatchUpdateNavbarEventUseCase,
    DispatchUpdateTopIdMenuEventUseCase,
    ListenerUpdateNavbarEventUseCase,
    ListenerUpdateTopIdMenuEventUseCase
} from "../ui"


export class InjectionUiEventUseCase {
    public static CreateUpdateNavbarEventUseCase() { return CreateUpdateNavbarEventUseCase.getInstance() }
    public static ListenerUpdateNavbarEventUseCase() { return ListenerUpdateNavbarEventUseCase.getInstance() }
    public static DispatchUpdateNavbarEventUseCase() { return DispatchUpdateNavbarEventUseCase.getInstance() }

    public static CreateUpdateTopIdMenuEventUseCase() { return CreateUpdateTopIdMenuEventUseCase.getInstance() }
    public static ListenerUpdateTopIdMenuEventUseCase() { return ListenerUpdateTopIdMenuEventUseCase.getInstance() }
    public static DispatchUpdateTopIdMenuEventUseCase() { return DispatchUpdateTopIdMenuEventUseCase.getInstance() }

}