import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getFromSessionStorage } from "../functions/session-storange";
import { KEYS_SESSION } from "../const/keys-session";
import { InjectionEventFacade } from "@/bus/facade/event/injection/injection-event-facade";
import { NAVBAR_TYPE } from "@/bus/shared/enums";

const _uIEventFacade = InjectionEventFacade.UiEventFacade();

const platformAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_PLATFORM,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "language": "es",
    },
});

platformAxios.interceptors.request.use(
    async (config) => {
        const PLATFORM = getFromSessionStorage(KEYS_SESSION.PLATFORM);

        if (PLATFORM?.token) {
            config.headers.Authorization = `Bearer ${PLATFORM.token}`;
        }

        return config;
    },
    function (error) {
        console.log("error", error);
        return Promise.reject(error);
    }
);

platformAxios.interceptors.response.use(
    async (config: AxiosResponse<unknown>) => {
        return config;
    },
    async (error) => {
        console.log("error response", error.response?.status);

        if (
            error.response?.status === 401 ||
            error.response?.status === 402 ||
            error.response?.status === 403
        ) {
            _uIEventFacade.dispatchUpdateNavbarEvent({ typeNavbar: NAVBAR_TYPE.HOME });
            window.location.href = "/welcome/home";
        }

        if (error.response?.status === 0 || error.response?.status === 500) {
            // Manejar errores de servidor
        }

        return Promise.reject(error);
    }
);

export default platformAxios;