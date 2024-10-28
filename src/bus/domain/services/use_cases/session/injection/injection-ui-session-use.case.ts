import { ReadNavbarTypeUseCase } from "../ui/read-navbar-type-use-case"
import { UpdateNavbarTypeUseCase } from "../ui/update-navbar-type-use-case"

export class InjectionUiSessionUseCase {
    public static ReadNavbarTypeUseCase() { return ReadNavbarTypeUseCase.getInstance() }
    public static UpdateNavbarTypeUseCase() { return UpdateNavbarTypeUseCase.getInstance() }

}