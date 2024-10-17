


import { BUS_EVENTS } from "../../../core/const";
import { IPlatformReduxDTO } from "../../../domain/models/redux/bus/platform";
import { IPlatformEventRepository } from "../../../domain/services/repositories/events/i-platform-event-repository";




export class PlatformEventRepository extends IPlatformEventRepository {
    


    private static instance: PlatformEventRepository;
    private updatePlatformEvent?: CustomEvent<{ message: IPlatformReduxDTO | null }>;

    private constructor() {
        super();
    }

    public static getInstance(): PlatformEventRepository {
        if (!PlatformEventRepository.instance)
            PlatformEventRepository.instance = new PlatformEventRepository();
        return PlatformEventRepository.instance;
    }

    public createUpdatePlatformEvent(param: IPlatformReduxDTO | null): CustomEvent<{ message: IPlatformReduxDTO | null }> {
        if (!this.updatePlatformEvent) {
            this.updatePlatformEvent = new CustomEvent(BUS_EVENTS.UPDATE_PLATFORM, {
                detail: { message: param }
            });
        }
        return this.updatePlatformEvent;

    }


    public listenerUpdatePlatformEvent(callback: (message: IPlatformReduxDTO) => void): void {
        document.addEventListener(BUS_EVENTS.UPDATE_PLATFORM, function (event: any) {
            if (callback) {
                callback(event?.detail?.message);
            }
        });
    }

    public dispatchUpdatePlatformEvent(param: IPlatformReduxDTO): void {
        document.dispatchEvent(this.createUpdatePlatformEvent(param));
    }



}