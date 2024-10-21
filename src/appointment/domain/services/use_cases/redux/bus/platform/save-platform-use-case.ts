import { IConfigDTO } from "../../../../../../core/interfaces";
import { UseCase } from "../../../../../../core/interfaces/use-case";
import { InjectionPlatformReduxMapper } from "../../../../../../infrastructure/mappers/redux/injection";
import { IAuthLoginResponseDTO } from "../../../../../models/apis/platform/business/auth/login";
import { InjectionRepositoriesRedux } from "../../../../../../infrastructure/repositories/redux/injection/injection-repositories-redux";



export class SavePlatformUseCase implements UseCase<any, void> {

    private static instance: SavePlatformUseCase;
    private platformReduxRepository = InjectionRepositoriesRedux.PlatformReduxRepository()
    private platformReduxMapper = InjectionPlatformReduxMapper.PlatformReduxMapper();
    


    public static getInstance(): SavePlatformUseCase {
        if (!SavePlatformUseCase.instance)
            SavePlatformUseCase.instance = new SavePlatformUseCase();
        return SavePlatformUseCase.instance;
    }

    public execute(
        param: IAuthLoginResponseDTO,
        config: IConfigDTO
    ): void {
        const data = this.platformReduxMapper.mapFrom(param)
        this.platformReduxRepository.savePlatform(data, config)
    }
}