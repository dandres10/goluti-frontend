import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";



export abstract class IPlatformEventRepository {
    abstract createUpdatePlatformEvent(param: IPlatformReduxDTO | null): CustomEvent<{ message: IPlatformReduxDTO | null }>;
    abstract listenerUpdatePlatformEvent(callback: (message: IPlatformReduxDTO) => void): void;
    abstract dispatchUpdatePlatformEvent(param: IPlatformReduxDTO): void;
}
