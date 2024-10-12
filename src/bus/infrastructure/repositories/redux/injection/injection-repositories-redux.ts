import { PlatformReduxRepository } from "../platform-redux-repository";

export class InjectionRepositoriesRedux {
    
    public static PlatformReduxRepository() { return PlatformReduxRepository.getInstance() }
}