import { IConfigDTO } from "../../../../../../core/interfaces";
import { UseCase } from "../../../../../../core/interfaces/use-case";
import { IPlatformReduxDTO } from "../../../../../../../onboarding/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "../../../../../../infrastructure/repositories/redux/injection/injection-repositories-redux";

export class SavePlatformUseCase implements UseCase<IPlatformReduxDTO, void> {

    private static instance: SavePlatformUseCase;
    private platformReduxRepository = InjectionRepositoriesRedux.PlatformReduxRepository()
    


    public static getInstance(): SavePlatformUseCase {
        if (!SavePlatformUseCase.instance)
            SavePlatformUseCase.instance = new SavePlatformUseCase();
        return SavePlatformUseCase.instance;
    }

    public execute(
        param: IPlatformReduxDTO,
        config: IConfigDTO
    ): void {
        this.platformReduxRepository.savePlatform(param, config)
    }
}