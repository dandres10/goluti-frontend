import { CreateUpdateNavbarEventUseCase, DispatchUpdateNavbarEventUseCase, ListenerUpdateNavbarEventUseCase } from "../ui"


export class InjectionUiEventUseCase {
    public static CreateUpdateNavbarEventUseCase() { return CreateUpdateNavbarEventUseCase.getInstance() }
    public static ListenerUpdateNavbarEventUseCase() { return ListenerUpdateNavbarEventUseCase.getInstance() }
    public static DispatchUpdateNavbarEventUseCase() { return DispatchUpdateNavbarEventUseCase.getInstance() }
}