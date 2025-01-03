import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadLanguageUseCase implements UseCase<any, ILanguageReduxDTO | undefined> {

    private static instance: ReadLanguageUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadLanguageUseCase {
        if (!ReadLanguageUseCase.instance)
            ReadLanguageUseCase.instance = new ReadLanguageUseCase();
        return ReadLanguageUseCase.instance;
    }

    public execute(config: IConfigDTO): ILanguageReduxDTO | undefined {
        return this.platformRepository.readLanguage(config);
    }
}