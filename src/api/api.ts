import type {MessageDescriptor} from "@lingui/core";
import {t} from "@lingui/core/macro";

type Result<T> = {
    error: false;
    data: T;
    url: string;
    status: number;
};

type Error = {
    error: true;
    data: {message: string};
    url: string;
};

export type Response<T> = Promise<Result<T> | Error>;

export type OkResponse = {
    message: "ok";
};

class Api {
    private static readonly retryStatus = [500, 502, 503, 504, 408, 429];
    private static readonly baseUrl = import.meta.env.VITE_API_URL;
    private static readonly maxRetry: number = 5;

    static fetch = async <T>(path: string, options: RequestInit, apiTokenRequired = true, retry = 0): Response<T> => {
        const url = `${this.baseUrl}${path}`;

        if (retry > this.maxRetry) {
            return {
                error: true,
                data: {message: t({message: "Failed to fetch server ressources. Try again later."})},
                url,
            };
        }

        if (apiTokenRequired && !this.hasToken()) {
            return {
                error: true,
                data: {message: t({message: "Client disconnected. Try logging in."})},
                url,
            };
        }

        const result = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...options.headers,
            },
        });

        try {
            const data = await result.json() as T;
            const {ok, status} = result;

            if (!ok) {
                if (this.retryStatus.includes(status)) {
                    return this.fetch(path, options, apiTokenRequired, retry + 1);
                }

                return {
                    error: true,
                    data: {message: t(data as MessageDescriptor)},
                    url,
                };
            }


            return {
                error: false,
                data,
                url,
                status,
            };
        } catch (_) {
            return {
                error: true,
                data: {message: t({message: "Received invalid response from the server."})},
                url,
            };
        }
    };

    static hasToken = (): boolean => true;
}

export default Api;
