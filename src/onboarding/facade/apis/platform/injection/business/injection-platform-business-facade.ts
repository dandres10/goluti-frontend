import { AuthFacade } from "../../business";


export class InjectionPlatformBusinessFacade {
    public static AuthFacade() { return AuthFacade.getInstance() }
}