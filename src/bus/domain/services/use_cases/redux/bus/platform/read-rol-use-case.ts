import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IRolReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadRolUseCase implements UseCase<any, IRolReduxDTO | undefined> {

    private static instance: ReadRolUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadRolUseCase {
        if (!ReadRolUseCase.instance)
            ReadRolUseCase.instance = new ReadRolUseCase();
        return ReadRolUseCase.instance;
    }

    public execute(config: IConfigDTO): IRolReduxDTO | undefined {
        return this.platformRepository.readRol(config);
    }
}