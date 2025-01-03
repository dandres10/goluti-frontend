import { AppDispatch } from "../config/redux/store"
import { SelectorOnboardingRedux } from "../types/selector-onboarding-redux"

export interface IConfigDTO {
    loadService?: boolean
    dispatch?: AppDispatch
    selector?: SelectorOnboardingRedux
    key?: string
}
