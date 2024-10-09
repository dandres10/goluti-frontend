import { Resolve } from "../classes/resolve";

export class InjectionCore {
    public static InjectionResolve() {
      return Resolve.getInstance();
    }
  }