import { IConfigDTO } from "../../../../core/interfaces";
import { IPlatformReduxDTO } from "../../../models/redux/bus/platform";

export abstract class IPlatformSessionRepository {
    abstract savePlatform(params: IPlatformReduxDTO, config: IConfigDTO): void;
    abstract readPlatform(config: IConfigDTO): IPlatformReduxDTO | null;
}