import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadCurrenciesUseCase implements UseCase<any, ICurrencyReduxDTO[] | undefined> {

    private static instance: ReadCurrenciesUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadCurrenciesUseCase {
        if (!ReadCurrenciesUseCase.instance)
            ReadCurrenciesUseCase.instance = new ReadCurrenciesUseCase();
        return ReadCurrenciesUseCase.instance;
    }

    public execute(config: IConfigDTO): ICurrencyReduxDTO[] | undefined {
        return this.platformRepository.readCurrencies(config);
    }
}