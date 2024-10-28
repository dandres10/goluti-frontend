import { PlatformEventRepository, UiEventRepository } from "../index";

export class InjectionEventRepository {
    public static PlatformEventRepository() { return PlatformEventRepository.getInstance() }
    public static UiEventRepository() { return UiEventRepository.getInstance() }
}