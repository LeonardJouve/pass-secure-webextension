import Api, {type OkResponse} from "./api";

export type User = {
    id: number;
    email: string;
    username: string;
};

export type GetMeResponse = User;

export type GetUserResponse = User;

export type GetUsersResponse = User[];

export type UpdateMeInput = Omit<User, "id"> & {password: string};

export type UpdateMeResponse = User;

class UsersApi {
    static getMe = async (): Promise<GetMeResponse> => await Api.fetch<GetMeResponse>("/users/me", {method: "GET"});
    static getUser = async (userId: User["id"]): Promise<GetUserResponse> => await Api.fetch<GetUserResponse>(`/users/${userId}`, {method: "GET"});
    static getUsers = async (): Promise<GetUsersResponse> => await Api.fetch<GetUsersResponse>("/users", {method: "GET"});
    static deleteMe = async (): Promise<OkResponse> => await Api.fetch<OkResponse>("/users/me", {method: "DELETE"});
    static updateMe = async (me: UpdateMeInput): Promise<UpdateMeResponse> => await Api.fetch<UpdateMeResponse>("/users/me", {method: "PUT", body: JSON.stringify(me)});
};

export default UsersApi;
