import { Resolve } from "../classes/resolve";

export class InjectionCore {
    public static Resolve() {
      return Resolve.getInstance();
    }
  }