import { IConfigDTO } from "../../../../../core/interfaces";
import { IPlatformReduxDTO, IUserReduxDTO } from "../../../../models/redux/platform";


export abstract class IPlatformReduxRepository {
    abstract savePlatform(params: IPlatformReduxDTO, config: IConfigDTO): void;
    abstract readUser(config: IConfigDTO): IUserReduxDTO | undefined;
}