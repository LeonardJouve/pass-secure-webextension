import Api, {type Response} from "./api";

export type User = {
    id: number;
    email: string;
    username: string;
};

export type GetMeResponse = User;

class UsersApi {
    static getMe = async (): Response<GetMeResponse> => await Api.fetch<GetMeResponse>("/users/me", {method: "GET"});
};

export default UsersApi;
