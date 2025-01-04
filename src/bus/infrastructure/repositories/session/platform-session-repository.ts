import { KEYS_SESSION_ENUM } from "@/bus/core/enums/keys-session-enum";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";
import { getFromSessionStorage, saveToSessionStorage } from "@/bus/core/functions/session-storange";
import { IPlatformSessionRepository } from "@/bus/domain/services/repositories/session/i-platform-session-repository";


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

    public savePlatform(params: IPlatformReduxDTO): void {
        saveToSessionStorage(KEYS_SESSION_ENUM.PLATFORM, params);
    }

    public readPlatform(): IPlatformReduxDTO | null {
        return getFromSessionStorage(KEYS_SESSION_ENUM.PLATFORM);
    }

    public deleteSession(): void {
        sessionStorage.removeItem(KEYS_SESSION_ENUM.PLATFORM);
        sessionStorage.removeItem(KEYS_SESSION_ENUM.UI);
    }


}