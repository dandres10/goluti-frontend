import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { ICurrencyReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadCurrencyUseCase implements UseCase<any, ICurrencyReduxDTO | undefined> {

    private static instance: ReadCurrencyUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadCurrencyUseCase {
        if (!ReadCurrencyUseCase.instance)
            ReadCurrencyUseCase.instance = new ReadCurrencyUseCase();
        return ReadCurrencyUseCase.instance;
    }

    public execute(config: IConfigDTO): ICurrencyReduxDTO | undefined {
        return this.platformRepository.readCurrency(config);
    }
}