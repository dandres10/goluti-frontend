import { IConfigDTO } from "@/bus/core/interfaces";
import { UseCase } from "@/bus/core/interfaces/use-case";
import { InjectionPlatformReduxMapper } from "@/bus/infrastructure/mappers/redux/injection";
import { IAuthLoginResponseDTO } from "@/bus/domain/models/apis/platform/business/auth/login";
import { InjectionRepositoriesRedux } from "../../../../../infrastructure/repositories/redux/injection/injection-repositories-redux";


export class SavePlatformUseCase implements UseCase<any, void> {

    private static instance: SavePlatformUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()
    private platformMapper = InjectionPlatformReduxMapper.PlatformReduxMapper();


    public static getInstance(): SavePlatformUseCase {
        if (!SavePlatformUseCase.instance)
            SavePlatformUseCase.instance = new SavePlatformUseCase();
        return SavePlatformUseCase.instance;
    }

    public execute(
        param: IAuthLoginResponseDTO,
        config: IConfigDTO
    ): void {
        const data = this.platformMapper.mapFrom(param)
        this.platformRepository.savePlatform(data, config)
    }
}