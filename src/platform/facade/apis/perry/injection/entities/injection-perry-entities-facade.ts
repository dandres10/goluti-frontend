import { CurrencyFacade } from "@perry/facade/apis/perry/entities/currency-facade";

export class InjectionPerryEntitiesFacade {
    public static CurrencyFacade() { return CurrencyFacade.getInstance(); }
}


