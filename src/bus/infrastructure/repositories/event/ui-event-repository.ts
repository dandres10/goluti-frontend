
import { BUS_EVENTS_ENUM } from "@/bus/core/enums/events-enum";
import { IUiReduxDTO } from "../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { IUiEventRepository } from "../../../domain/services/repositories/events/i-ui-event-repository";

export class UiEventRepository extends IUiEventRepository {

    private static instance: UiEventRepository;

    private constructor() {
        super();
    }

    public static getInstance(): UiEventRepository {
        if (!UiEventRepository.instance) {
            UiEventRepository.instance = new UiEventRepository();
        }
        return UiEventRepository.instance;
    }

    public createUpdateNavbarTypeEvent(param: IUiReduxDTO): CustomEvent<{ message: IUiReduxDTO }> {
        return new CustomEvent(BUS_EVENTS_ENUM.UPDATE_NAVBAR, {
            detail: { message: param }
        });
    }

    public listenerUpdateNavbarTypeEvent(callback: (message: IUiReduxDTO) => void): void {
        document.addEventListener(BUS_EVENTS_ENUM.UPDATE_NAVBAR, (event: any) => {
            callback(event?.detail?.message);
        });
    }

    public dispatchUpdateNavbarTypeEvent(param: IUiReduxDTO): void {
        const updateEvent = new CustomEvent(BUS_EVENTS_ENUM.UPDATE_NAVBAR, {
            detail: { message: param }
        });
        document.dispatchEvent(updateEvent);

    }
}