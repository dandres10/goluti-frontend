import { ReadNavbarTypeUseCase } from "../ui/read-navbar-type-use-case"
import { UpdateNavbarTypeUseCase } from "../ui/update-navbar-type-use-case"
import { ReadTopIdMenuUseCase } from "../ui/read-top-id-menu-use-case"
import { UpdateTopIdMenuUseCase } from "../ui/update-top-id-menu-use-case"

export class InjectionUiSessionUseCase {
    public static ReadNavbarTypeUseCase() { return ReadNavbarTypeUseCase.getInstance() }
    public static UpdateNavbarTypeUseCase() { return UpdateNavbarTypeUseCase.getInstance() }
    public static ReadTopIdMenuUseCase() { return ReadTopIdMenuUseCase.getInstance() }
    public static UpdateTopIdMenuUseCase() { return UpdateTopIdMenuUseCase.getInstance() }

}