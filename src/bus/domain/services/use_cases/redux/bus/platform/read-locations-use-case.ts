import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILocationReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadLocationsUseCase implements UseCase<any, ILocationReduxDTO[] | undefined> {

    private static instance: ReadLocationsUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadLocationsUseCase {
        if (!ReadLocationsUseCase.instance)
            ReadLocationsUseCase.instance = new ReadLocationsUseCase();
        return ReadLocationsUseCase.instance;
    }

    public execute(config: IConfigDTO): ILocationReduxDTO[] | undefined {
        return this.platformRepository.readLocations(config);
    }
}