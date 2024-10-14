import { AppDispatch } from "../config/redux/store"
import { SelectorBusRedux } from "../types/selector-bus-redux"

export interface IConfigDTO {
    loadService?: boolean
    dispatch?: AppDispatch
    selector?: SelectorBusRedux
}
