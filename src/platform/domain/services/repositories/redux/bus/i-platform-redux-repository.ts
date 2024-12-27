import { IConfigDTO } from "../../../../../core/interfaces";
import { IPlatformReduxDTO, IUserReduxDTO } from "../../../../models/redux/bus/platform";


export abstract class IPlatformReduxRepository {
    abstract updatePlatform(params: IPlatformReduxDTO, config: IConfigDTO): void;
    abstract readUser(config: IConfigDTO): IUserReduxDTO | undefined;
}