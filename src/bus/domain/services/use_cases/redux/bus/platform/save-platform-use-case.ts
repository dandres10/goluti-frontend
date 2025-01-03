import { IConfigDTO } from "../../../../../../core/interfaces";
import { UseCase } from "../../../../../../core/interfaces/use-case";
import { InjectionRepositoriesRedux } from "../../../../../../infrastructure/repositories/redux/injection/injection-repositories-redux";
import { IPlatformReduxDTO } from "@/bus/domain/models/redux/bus/platform";



export class SavePlatformUseCase implements UseCase<any, void> {

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