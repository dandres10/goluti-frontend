import { AuthRepository } from "../business";

export class InjectionPlatformBusinessRepository {
    public static AuthRepository() { return AuthRepository.getInstance() }
}