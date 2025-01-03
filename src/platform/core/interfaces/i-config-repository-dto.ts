import { AppDispatch } from "../config/redux/store"
import { SelectorPlatformRedux } from "../types/selector-platform-redux"

export interface IConfigDTO {
    loadService?: boolean
    dispatch?: AppDispatch
    selector?: SelectorPlatformRedux
    key?: string
}
