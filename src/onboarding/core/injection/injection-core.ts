import { Resolve } from "../classes";

export class InjectionCore {
    public static Resolve() {
      return Resolve.getInstance();
    }
  }