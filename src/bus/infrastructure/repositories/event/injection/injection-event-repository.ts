import { PlatformEventRepository } from "../platform-event-repository";

export class InjectionEventRepository {
    public static PlatformEventRepository() { return PlatformEventRepository.getInstance() }
}