import { PlatformReduxRepository } from "../bus/platform/platform-redux-repository";

export class InjectionRepositoriesRedux {
    
    public static PlatformReduxRepository() { return PlatformReduxRepository.getInstance() }
}