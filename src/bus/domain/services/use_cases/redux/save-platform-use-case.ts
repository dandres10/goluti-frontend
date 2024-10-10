import { UseCase } from "@/bus/core/interfaces/use-case";
import { PlatformReduxRepository } from "@/bus/infrastructure/repositories/redux/platform-redux-repository";


export class SavePlatformUseCase implements UseCase<any, void> {

    private static instance: SavePlatformUseCase;
    private platformRepository = PlatformReduxRepository.getInstance()


    public static getInstance(): SavePlatformUseCase {
        if (!SavePlatformUseCase.instance)
            SavePlatformUseCase.instance = new SavePlatformUseCase();
        return SavePlatformUseCase.instance;
    }

    public execute(
        params: any
    ): void {
        this.platformRepository.savePlatform(params)
    }
}