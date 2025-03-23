import Api, {type Response} from "./api";

export type User = {
    id: number;
    email: string;
    username: string;
};

export type GetMeResponse = User;

export type GetUserResponse = User;

export type GetUsersResponse = User[];

class UsersApi {
    static getMe = async (): Response<GetMeResponse> => await Api.fetch<GetMeResponse>("/users/me", {method: "GET"});
    static getUser = async (userId: User["id"]): Response<GetUserResponse> => await Api.fetch<GetUserResponse>(`/users/${userId}`, {method: "GET"});
    static getUsers = async (): Response<GetUsersResponse> => await Api.fetch<GetUsersResponse>("/users", {method: "GET"});
};

export default UsersApi;
