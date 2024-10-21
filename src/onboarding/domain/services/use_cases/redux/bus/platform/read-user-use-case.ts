import { IConfigDTO } from "../../../../../../core/interfaces";
import { UseCase } from "../../../../../../core/interfaces/use-case";
import { IUserReduxDTO } from "../../../../../models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "../../../../../../infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadUserUseCase implements UseCase<any, IUserReduxDTO | undefined> {

    private static instance: ReadUserUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()



    public static getInstance(): ReadUserUseCase {
        if (!ReadUserUseCase.instance)
            ReadUserUseCase.instance = new ReadUserUseCase();
        return ReadUserUseCase.instance;
    }

    public execute(config: IConfigDTO): IUserReduxDTO | undefined {
        return this.platformRepository.readUser(config);
    }
}