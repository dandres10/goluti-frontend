import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getFromSessionStorage } from "../functions/session-storange";
import { KEYS_SESSION } from "../const/keys-session";

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
        return Promise.reject(error);
    }
);

platformAxios.interceptors.response.use(
    async (config: AxiosResponse<unknown>) => {
        /* if (
          config.status === 401 ||
          config.status === 402 ||
          config.status === 403
        ) {
        }
     
        if (config.status === 0 || config.status === 500) {
        } */

        return config;
    }
);

export default platformAxios;