import { UiSessionRepository } from "../ui-session-repository";

export class InjectionUiSessionRepository {
    public static UiSessionRepository() { return UiSessionRepository.getInstance() }
}