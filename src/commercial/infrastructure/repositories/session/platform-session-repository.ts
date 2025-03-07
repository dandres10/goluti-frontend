
import { IConfigDTO } from "../../../core/interfaces";
import { IPlatformReduxDTO } from "../../../domain/models/redux/bus/platform";
import { getFromSessionStorage, saveToSessionStorage } from "../../../core/functions/session-storange";
import { IPlatformSessionRepository } from "../../../domain/services/repositories/session/i-platform-session-repository";


export class PlatformSessionRepository extends IPlatformSessionRepository {

    private static instance: PlatformSessionRepository;

    public constructor() {
        super();
    }

    public static getInstance(): PlatformSessionRepository {
        if (!PlatformSessionRepository.instance)
            PlatformSessionRepository.instance = new PlatformSessionRepository();
        return PlatformSessionRepository.instance;
    }

    public savePlatform(params: IPlatformReduxDTO, config: IConfigDTO): void {
        if (config?.key){
            saveToSessionStorage(config.key, params);
        }
    }

    public readPlatform(config: IConfigDTO): IPlatformReduxDTO | null {
        if (config?.key)
            return getFromSessionStorage(config.key)
        return null
    }


}