import Api from "./api";
import type {OkResponse, Response} from "./api";

export type RegisterInput = {
    email: string;
    password: string;
    passwordConfirm: string;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

class AuthApi {
    static register = async (input: RegisterInput): Response<OkResponse> => await Api.fetch<OkResponse>("/register", {
        method: "POST",
        body: JSON.stringify(input),
    }, false);

    static login = async (input: LoginInput): Response<LoginResponse> => await Api.fetch<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify(input),
    }, false);
}

export default AuthApi;
