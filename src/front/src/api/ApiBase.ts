import type {AxiosRequestConfig} from "axios";

import {HttpClient} from "./HttpClient";

interface IParamsMap {
    [key: string]: null | undefined | number | string | boolean | File ;
}

const DEV_API_URL = "/api";
const PROD_API_URL = "/api";

export class ApiBase {
    constructor(private cfg: AxiosRequestConfig = {}) {
    }

    baseUrl = import.meta.env.PROD ?  PROD_API_URL: DEV_API_URL;

    public get<TValue>(url: string, params?: IParamsMap): Promise<TValue> {
        return HttpClient.send<TValue>(`${this.baseUrl}/${url}`, 'GET', this.getOptions(params));
    }

    public post<TValue>(url: string, params?: IParamsMap, data?: object | string): Promise<TValue> {
        return HttpClient.send(`${this.baseUrl}/${url}`, 'POST', this.getOptions(params, data));
    }

    public put<TValue>(url: string, params?: IParamsMap, data?: object): Promise<TValue> {
        return HttpClient.send(`${this.baseUrl}/${url}`, 'PUT', this.getOptions(params, data));
    }

    public delete<TValue>(url: string): Promise<TValue> {
        return HttpClient.send(`${this.baseUrl}/${url}`, 'DELETE');
    }

    private getOptions(params?: IParamsMap, data?: object | string): AxiosRequestConfig {
        return { params, data, ...this.cfg };
    }
}
