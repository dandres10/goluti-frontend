import { PlatformSessionRepository } from "../platform-session-repository";

export class InjectionPlatformSessionRepository {
    public static PlatformSessionRepository() { return PlatformSessionRepository.getInstance() }
   
}