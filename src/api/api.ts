type Result<T> = {
    error: false;
    data: T;
    url: string;
    status: number;
};

type Error = {
    error: true;
    data: MessageDescriptor;
    url: string;
};

export type Response<T> = Promise<Result<T> | Error>;

export type OkResponse = Response<{
    message: "ok";
}>;

class Api {
    private static readonly baseUrl = import.meta.env.VITE_API_URL;
    private static readonly maxRetry: number = 5;

    static fetch = async <T>(path: string, options: RequestInit, apiTokenRequired = true, retry = 0): RestResponse<T> => {
        const url = `${this.baseUrl}${path}`;

        if (retry > this.maxRetry) {
            const data = {
                id: "api.rest.error.retry_exceeded",
                defaultMessage: "Failed to fetch server ressources. Try again later.",
            };

            return {
                error: true,
                data,
                url,
            };
        }

        if (apiTokenRequired && !this.hasToken()) {
            const data = {
                id: "api.rest.error.disconnected",
                defaultMessage: "Client disconnected. Try logging in.",
            };

            return {
                error: true,
                data,
                url,
            };
        }

        const headers: RequestInit["headers"] = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...options.headers,
        };

        const result = await fetch(url, {
            ...options,
            headers,
        });


        let data: T|MessageDescriptor;
        try {
            data = await result.json() as T;
        } catch (error) {
            data = {
                id: "api.rest.error.invalid_json",
                defaultMessage: "Received invalid response from the server.",
            };

            return {
                error: true,
                data,
                url,
            };
        }

        const {ok, status} = result;

        if (!ok) {
            return {
                error: true,
                data,
                url,
            };
        }


        return {
            data,
            url: path,
            error: false,
            status,
        };
    }

    static hasToken = (): boolean => false;
}

export default Api;
