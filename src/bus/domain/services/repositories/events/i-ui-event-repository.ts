
import { IUiReduxDTO } from "../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";

export abstract class IUiEventRepository {

    abstract createUpdateNavbarTypeEvent(param: IUiReduxDTO): CustomEvent<{ message: IUiReduxDTO }>;
    abstract listenerUpdateNavbarTypeEvent(callback: (message: IUiReduxDTO) => void): void;
    abstract dispatchUpdateNavbarTypeEvent(param: IUiReduxDTO): void;
}
