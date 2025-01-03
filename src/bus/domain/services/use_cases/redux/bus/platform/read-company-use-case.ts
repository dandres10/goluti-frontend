import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadCompanyUseCase implements UseCase<any, ICompanyReduxDTO | undefined> {

    private static instance: ReadCompanyUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadCompanyUseCase {
        if (!ReadCompanyUseCase.instance)
            ReadCompanyUseCase.instance = new ReadCompanyUseCase();
        return ReadCompanyUseCase.instance;
    }

    public execute(config: IConfigDTO): ICompanyReduxDTO | undefined {
        return this.platformRepository.readCompany(config);
    }
}