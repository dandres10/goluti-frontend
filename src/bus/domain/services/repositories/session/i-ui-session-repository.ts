import { IConfigDTO } from "../../../../core/interfaces";
import { IUiReduxDTO } from "../../../../../bus/domain/models/redux/bus/ui/i-ui-redux-dto";

export abstract class IUiSessionRepository {
    abstract updateNavbarType(params: IUiReduxDTO, config: IConfigDTO): void;
    abstract readNavbarType(config: IConfigDTO): IUiReduxDTO | null;
}