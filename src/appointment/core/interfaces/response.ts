import { MESSAGE_TYPE_ENUM } from "../enums/message-type-enum";
import { NOTIFICATION_TYPE_ENUM } from "../enums/notification-type-enum";

export interface Response<T> {
    response: T | null;
    message: string | string[] | null;
    message_type: MESSAGE_TYPE_ENUM;
    notification_type: NOTIFICATION_TYPE_ENUM;
}