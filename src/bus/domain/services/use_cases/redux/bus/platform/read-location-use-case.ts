import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadLocationUseCase implements UseCase<any, ILocationReduxDTO | undefined> {

    private static instance: ReadLocationUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadLocationUseCase {
        if (!ReadLocationUseCase.instance)
            ReadLocationUseCase.instance = new ReadLocationUseCase();
        return ReadLocationUseCase.instance;
    }

    public execute(config: IConfigDTO): ILocationReduxDTO | undefined {
        return this.platformRepository.readLocation(config);
    }
}