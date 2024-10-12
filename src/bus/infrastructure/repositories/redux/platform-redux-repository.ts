import { IConfigDTO } from '../../../core/interfaces';
import { ACTIONS_AUTH } from "../../../domain/services/repositories/redux/auth";
import { IPlatformReduxDTO, IUserReduxDTO } from '../../../domain/models/redux/platform';
import { IPlatformReduxRepository } from "../../../domain/services/repositories/redux/platform/i-platform-redux-repository";


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
            config.dispatch(ACTIONS_AUTH.addPlatformAction(params));
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