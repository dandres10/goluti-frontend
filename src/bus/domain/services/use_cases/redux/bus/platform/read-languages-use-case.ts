import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ILanguageReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadLanguagesUseCase implements UseCase<any, ILanguageReduxDTO[] | undefined> {

    private static instance: ReadLanguagesUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadLanguagesUseCase {
        if (!ReadLanguagesUseCase.instance)
            ReadLanguagesUseCase.instance = new ReadLanguagesUseCase();
        return ReadLanguagesUseCase.instance;
    }

    public execute(config: IConfigDTO): ILanguageReduxDTO[] | undefined {
        return this.platformRepository.readLanguages(config);
    }
}