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

export type LoginResponse = Response<{
    accessToken: string;
}>;

class Auth {
    static register = async (input: RegisterInput): Promise<OkResponse> => await Promise.resolve({message: "ok"});
    static login = async (input: LoginInput): Promise<LoginResponse> => await Promise.resolve({accessToken: ""});
}

export default Auth;
