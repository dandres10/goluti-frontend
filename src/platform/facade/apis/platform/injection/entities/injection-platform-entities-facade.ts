import { LocationFacade } from "@platform/facade/apis/platform/entities/location-facade";
import { CurrencyFacade } from "@platform/facade/apis/platform/entities/currency-facade";
import { LanguageFacade } from "@platform/facade/apis/platform/entities/language-facade";
import { RolFacade } from "@platform/facade/apis/platform/entities/rol-facade";
export class InjectionPlatformEntitiesFacade {
    public static LocationFacade() { return LocationFacade.getInstance(); }    public static CurrencyFacade() { return CurrencyFacade.getInstance(); }
    public static LanguageFacade() { return LanguageFacade.getInstance(); }
    public static RolFacade() { return RolFacade.getInstance(); }
}


