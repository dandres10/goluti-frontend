import { AppDispatch } from "../config/redux/store"
import { SelectorAppointmentRedux } from "../types/selector-appointment-redux"

export interface IConfigDTO {
    loadService?: boolean
    dispatch?: AppDispatch
    selector?: SelectorAppointmentRedux
    key?: string
}
