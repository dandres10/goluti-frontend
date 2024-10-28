
import { IConfigDTO } from "../../../core/interfaces";
import { IUiReduxDTO } from "../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";
import { getFromSessionStorage, saveToSessionStorage } from "../../../core/functions/session-storange";
import { IUiSessionRepository } from "../../../domain/services/repositories/session/i-ui-session-repository";


export class UiSessionRepository extends IUiSessionRepository {

    private static instance: UiSessionRepository;

    public constructor() {
        super();
    }

    public static getInstance(): UiSessionRepository {
        if (!UiSessionRepository.instance)
            UiSessionRepository.instance = new UiSessionRepository();
        return UiSessionRepository.instance;
    }

    public updateNavbarType(params: IUiReduxDTO, config: IConfigDTO): void {
        if (config?.key) {
            saveToSessionStorage(config.key, params);
        }
    }

    public readNavbarType(config: IConfigDTO): IUiReduxDTO | null {
        if (config?.key)
            return getFromSessionStorage(config.key)
        return null
    }


}