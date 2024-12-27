import { ACTIONS_APPOINTMENT } from './platform.action';
import { IConfigDTO } from '../../../../../core/interfaces';
import { IPlatformReduxDTO, IUserReduxDTO } from '../../../../../domain/models/redux/bus/platform';
import { IPlatformReduxRepository } from "../../../../../domain/services/repositories/redux/bus/i-platform-redux-repository";

export class PlatformReduxRepository extends IPlatformReduxRepository {

    private static instance: PlatformReduxRepository;

    public static getInstance(): PlatformReduxRepository {
        if (!PlatformReduxRepository.instance)
            PlatformReduxRepository.instance = new PlatformReduxRepository();
        return PlatformReduxRepository.instance;
    }

    public updatePlatform(
        params: IPlatformReduxDTO,
        config: IConfigDTO
    ): void {
        if (config?.dispatch) {
            config.dispatch(ACTIONS_APPOINTMENT.updatePlatformAction(params));
        }
    };

    public readUser(config: IConfigDTO): IUserReduxDTO | undefined {
        if (config?.selector) {
            const user = config.selector((state: any) => state?.platform?.platform?.configuration?.user);
            return user;
        }
        return undefined;
    }
}