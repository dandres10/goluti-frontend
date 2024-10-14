import { IConfigDTO } from '../../../../../core/interfaces';
import { ACTIONS_BUS } from './platform.action';
import { IPlatformReduxDTO, IUserReduxDTO } from '../../../../../domain/models/redux/bus/platform';
import { IPlatformReduxRepository } from "../../../../../domain/services/repositories/redux/bus/i-platform-redux-repository";


export class PlatformReduxRepository extends IPlatformReduxRepository {

    private static instance: PlatformReduxRepository;

    public static getInstance(): PlatformReduxRepository {
        if (!PlatformReduxRepository.instance)
            PlatformReduxRepository.instance = new PlatformReduxRepository();
        return PlatformReduxRepository.instance;
    }

    public savePlatform(
        params: IPlatformReduxDTO,
        config: IConfigDTO
    ): void {
        if (config?.dispatch) {
            config.dispatch(ACTIONS_BUS.addPlatformAction(params));
        }
    };

    public readUser(config: IConfigDTO): IUserReduxDTO | undefined {
        if (config?.selector) {
            const user = config.selector((state: any) => state?.bus?.platform?.configuration?.user);
            return user;
        }
        return undefined;
    }
}