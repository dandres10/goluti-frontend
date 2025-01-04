import { IConfigDTO } from "../../../../../../core/interfaces";
import { UseCase } from "../../../../../../core/interfaces/use-case";
import { IPlatformReduxDTO } from "../../../../../../domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "../../../../../../infrastructure/repositories/redux/injection/injection-repositories-redux";

export class UpdatePlatformUseCase implements UseCase<IPlatformReduxDTO | null, void> {

    private static instance: UpdatePlatformUseCase;
    private platformReduxRepository = InjectionRepositoriesRedux.PlatformReduxRepository()




    public static getInstance(): UpdatePlatformUseCase {
        if (!UpdatePlatformUseCase.instance)
            UpdatePlatformUseCase.instance = new UpdatePlatformUseCase();
        return UpdatePlatformUseCase.instance;
    }

    public execute(
        param: IPlatformReduxDTO | null,
        config: IConfigDTO
    ): void {
        this.platformReduxRepository.updatePlatform(param, config)
    }
}