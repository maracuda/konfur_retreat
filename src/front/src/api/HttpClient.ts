import type {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from "axios";
import axios from "axios";

export class HttpClient {
    public static send<TValue>(url: string, method: Method, options?: AxiosRequestConfig): Promise<TValue> {
        const extendedOptions = this.extendOptions(method, options);

        return axios(url, extendedOptions)
            .then((response: AxiosResponse<TValue>) => response.data)
            .catch((error: AxiosError) => Promise.reject(error.response!.status));
    }

    private static extendOptions(method: Method, options?: AxiosRequestConfig): AxiosRequestConfig {
        return {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            timeout: 30000,
            withCredentials: false,
            data: options ? options.data : null,
            ...options,
        };
    }
}