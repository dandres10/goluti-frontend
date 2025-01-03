import { AppDispatch } from "../config/redux/store"
import { SelectorCommercialRedux } from "../types/selector-commercial-redux"

export interface IConfigDTO {
    loadService?: boolean
    dispatch?: AppDispatch
    selector?: SelectorCommercialRedux
    key?: string
}
