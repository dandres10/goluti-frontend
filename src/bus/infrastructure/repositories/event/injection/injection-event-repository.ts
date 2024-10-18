import { PlatformEventRepository } from "../index";

export class InjectionEventRepository {
    public static PlatformEventRepository() { return PlatformEventRepository.getInstance() }
}