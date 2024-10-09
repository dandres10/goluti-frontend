import { NOTIFICATION_TYPE_ENUM } from "../enums/notification-type-enum";
import { Response } from '../interfaces/response';


export class Resolve {
    private static instance: Resolve;

    private constructor() { }

    public static getInstance(): Resolve {
        if (!Resolve.instance) Resolve.instance = new Resolve();
        return Resolve.instance;
    }

    public ResolveRequest = <T>(requestResult: Response<T>): T | null => {

        //TODO: mapeador para diferentes objetos de respuesta
        /* requestResult = { ...requestResult, response: requestResult?.result }; */

        if (requestResult) {
            switch (requestResult.notification_type) {
                case NOTIFICATION_TYPE_ENUM.SUCCESS:
                    /*  ShowMessageGlobal(requestResult, TipoNotificacion.Fallida) */
                    return requestResult.response;
                case NOTIFICATION_TYPE_ENUM.WARNING:
                    /*  ShowMessageGlobal(requestResult, TipoNotificacion.Advertencia) */
                    return requestResult.response;
                case NOTIFICATION_TYPE_ENUM.DANGER:
                    /*  ShowMessageGlobal(requestResult, TipoNotificacion.Exitoso) */
                    return requestResult.response;
                default:
                    return requestResult.response;
            }
        }

        return null;
    };
}