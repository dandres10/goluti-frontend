import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadFirstLevelMenuUseCase implements UseCase<any, IMenuReduxDTO[] | undefined> {

    private static instance: ReadFirstLevelMenuUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadFirstLevelMenuUseCase {
        if (!ReadFirstLevelMenuUseCase.instance)
            ReadFirstLevelMenuUseCase.instance = new ReadFirstLevelMenuUseCase();
        return ReadFirstLevelMenuUseCase.instance;
    }

    public execute(config: IConfigDTO): IMenuReduxDTO[] | undefined {
        return this.platformRepository.readFirstLevelMenu(config);
    }
}