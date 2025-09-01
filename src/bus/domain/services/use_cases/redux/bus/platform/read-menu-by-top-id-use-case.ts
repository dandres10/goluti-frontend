import { IReadMenuByTopIdParamsDTO } from "@/bus/domain/models/redux/bus/platform/i-read-menu-by-top-id-params-dto";
import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { IMenuReduxDTO } from "@bus/domain/models/redux/bus/platform";
import { InjectionRepositoriesRedux } from "@bus/infrastructure/repositories/redux/injection/injection-repositories-redux";


export class ReadMenuByTopIdUseCase implements UseCase<IReadMenuByTopIdParamsDTO, IMenuReduxDTO[] | undefined> {

    private static instance: ReadMenuByTopIdUseCase;
    private platformRepository = InjectionRepositoriesRedux.PlatformReduxRepository()

    public static getInstance(): ReadMenuByTopIdUseCase {
        if (!ReadMenuByTopIdUseCase.instance)
            ReadMenuByTopIdUseCase.instance = new ReadMenuByTopIdUseCase();
        return ReadMenuByTopIdUseCase.instance;
    }

    public execute(params: IReadMenuByTopIdParamsDTO, config: IConfigDTO): IMenuReduxDTO[] | undefined {
        return this.platformRepository.readMenuByTopId(config, params);
    }
}