import Api, {type OkResponse, type Response} from "./api";

export type User = {
    id: number;
    email: string;
    username: string;
};

export type GetMeResponse = User;

export type GetUserResponse = User;

export type GetUsersResponse = User[];

export type UpdateMeResponse = User;

class UsersApi {
    static getMe = async (): Response<GetMeResponse> => await Api.fetch<GetMeResponse>("/users/me", {method: "GET"});
    static getUser = async (userId: User["id"]): Response<GetUserResponse> => await Api.fetch<GetUserResponse>(`/users/${userId}`, {method: "GET"});
    static getUsers = async (): Response<GetUsersResponse> => await Api.fetch<GetUsersResponse>("/users", {method: "GET"});
    static deleteMe = async (): Response<OkResponse> => await Api.fetch<OkResponse>("/users/me", {method: "DELETE"});
    static updateMe = async (me: Omit<User, "id"> & {password: string}): Response<UpdateMeResponse> => await Api.fetch<UpdateMeResponse>("/users/me", {method: "PUT", body: JSON.stringify(me)});
};

export default UsersApi;
