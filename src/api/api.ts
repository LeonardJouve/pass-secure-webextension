import {t} from "@lingui/core/macro";
import type {MessageDescriptor} from "@lingui/core";

export type OkResponse = {
    message: "ok";
};

class Api {
    static fetch = async <T>(path: string, options: RequestInit, apiTokenRequired = true): Promise<T> => {
        if (apiTokenRequired && !this.hasToken()) {
            throw new Error(t({message: "Client disconnected. Try logging in."}));
        }

        const result = await fetch(import.meta.env.VITE_API_URL + path, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...options.headers,
            },
        });

        try {
            const {ok} = result;
            const data = await result.json() as T;

            if (!ok) {
                throw new Error(t(data as MessageDescriptor));
            }

            return data;
        } catch (_) {
            throw new Error(t({message: "Received invalid response from the server."}));
        }
    };

    static hasToken = (): boolean => true;
}

export default Api;
