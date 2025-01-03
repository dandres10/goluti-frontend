
import { AppDispatch } from "@/core/redux/redux-core"
import { KEYS_SESSION_ENUM } from "../enums/keys-session-enum"

export interface IConfigDTO {
    loadService?: boolean
    dispatch?: AppDispatch
    selector?: any
    key?: KEYS_SESSION_ENUM
}
