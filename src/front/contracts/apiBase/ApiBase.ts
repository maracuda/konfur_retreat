import { ApiError } from "./ApiError";
import {Guid} from "../../domain/dataTypes/Guid";

interface ParamsMap {
    [key: string]: null | undefined | number | string | any[] | boolean;
}

export class ApiBase {
    public static initialize(prefix: string) {
        this.prefix = prefix;
    }

    public static additionalHeaders: RequestInit = {
        headers: {
            ["Cache-Control"]: "no-cache, no-store",
            ["Pragma"]: "no-cache",
            ["Expires"]: "0",
            ["Content-Type"]: "application/json",
        },
        ["credentials"]: "same-origin",
    };

    public static prefix: string;
    public static shopId: Guid;
    public static departmentId: Guid;
    public static organizationId: Guid;

    public async checkStatus(response: Response): Promise<void> {
        if (!(response.status >= 200 && response.status < 300)) {
            const errorText = await response.text();
            throw new ApiError(errorText, response.status);
        }
    }

    public async post(url: string, params: ParamsMap, body: {} | null | undefined | any[]): Promise<any> {
        const response = await fetch(ApiBase.prefix + url + this.createQueryString(params), {
            ...ApiBase.additionalHeaders,
            method: "POST",
            body: JSON.stringify(body),
        });
        await this.checkStatus(response);
        const textResult = await response.text();
        if (textResult !== "") {
            return JSON.parse(textResult);
        }
        return undefined;
    }

    public async put(url: string, params: ParamsMap, body: null | undefined | {} | any[]): Promise<any> {
        const response = await fetch(ApiBase.prefix + url + this.createQueryString(params), {
            ...ApiBase.additionalHeaders,
            method: "PUT",
            body: JSON.stringify(body),
        });
        await this.checkStatus(response);
        const textResult = await response.text();
        if (textResult !== "") {
            return JSON.parse(textResult);
        }
        return undefined;
    }

    public async putBinary(url: string, params: ParamsMap, body: Blob): Promise<any> {
        const response = await fetch(ApiBase.prefix + url + this.createQueryString(params), {
            ...ApiBase.additionalHeaders,
            method: "PUT",
            body: body,
        });
        await this.checkStatus(response);
        const textResult = await response.text();
        if (textResult !== "") {
            return JSON.parse(textResult);
        }
        return undefined;
    }

    public createQueryString(params: null | undefined | ParamsMap): string {
        if (params == null) {
            return "";
        }
        const params2 = params;
        let result = Object.keys(params)
            .map(key => {
                const value = params2[key];
                if (typeof value === "string") {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
                }
                if (typeof value === "number" || typeof value === "boolean") {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(value.toString());
                }
                if (Array.isArray(value)) {
                    return value
                        .map(item => {
                            if (typeof item === "string") {
                                return encodeURIComponent(key) + "=" + encodeURIComponent(item);
                            }
                            if (typeof item === "number") {
                                return encodeURIComponent(key) + "=" + encodeURIComponent(item.toString());
                            }
                            return null;
                        })
                        .filter(x => x !== null)
                        .join("&");
                }
                return null;
            })
            .filter(x => x !== null)
            .join("&");
        result = result ? "?" + result : "";
        return result;
    }

    public async get(url: string, params?: ParamsMap, _body?: any): Promise<any> {
        const response = await fetch(ApiBase.prefix + url + this.createQueryString(params), {
            ...ApiBase.additionalHeaders,
            method: "GET",
        });
        await this.checkStatus(response);
        return await response.json();
    }

    public async head(url: string, params?: ParamsMap): Promise<any> {
        const response = await fetch(ApiBase.prefix + url + this.createQueryString(params), {
            ...ApiBase.additionalHeaders,
            method: "HEAD",
        });
        return response.status >= 200 && response.status < 300;
    }

    public async download(url: string, params?: ParamsMap, _body?: any): Promise<any> {
        const headResult = await this.head(url, params);
        if (headResult) {
            location.href = ApiBase.prefix + url + this.createQueryString(params);
        } else {
            return await this.get(url, params);
        }
    }

    public async delete(url: string, params?: ParamsMap, body?: {}): Promise<any> {
        const response = await fetch(ApiBase.prefix + url + this.createQueryString(params), {
            ...ApiBase.additionalHeaders,
            method: "DELETE",
            body: JSON.stringify(body),
        });
        await this.checkStatus(response);
        const textResult = await response.text();
        if (textResult !== "") {
            return JSON.parse(textResult);
        }
        return undefined;
    }
}
