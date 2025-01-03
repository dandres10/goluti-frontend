import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICompanyReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadCompaniesUseCase implements UseCase<any, ICompanyReduxDTO[] | undefined> {

    private static instance: ReadCompaniesUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadCompaniesUseCase {
        if (!ReadCompaniesUseCase.instance)
            ReadCompaniesUseCase.instance = new ReadCompaniesUseCase();
        return ReadCompaniesUseCase.instance;
    }

    public execute(config: IConfigDTO): ICompanyReduxDTO[] | undefined {
        return this.platformRepository.readCompanies(config);
    }
}