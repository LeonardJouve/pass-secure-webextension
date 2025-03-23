import {create} from "zustand";
import type {Response} from "../api/api";
import UsersApi from "../api/users";
import type {GetMeResponse, GetUserResponse, GetUsersResponse, User} from "../api/users";

type UsersStore = {
    me: User|null;
    users: User[];
    getMe: () => Response<GetMeResponse>;
    getUser: (userId: User["id"]) => Response<GetUserResponse>;
    getUsers: () => Response<GetUsersResponse>;
};

const useUsers = create<UsersStore>((set) => ({
    me: null,
    users: [],
    getMe: async (): Response<GetMeResponse> => {
        const response = await UsersApi.getMe();
        if (!response.error) {
            set(({users}) => ({
                me: response.data,
                users: [
                    ...users,
                    response.data,
                ],
            }));
        }

        return response;
    },
    getUser: async (userId): Response<GetUserResponse> => {
        const response = await UsersApi.getUser(userId);
        if (!response.error) {
            set(({users}) => ({users: [
                ...users,
                response.data,
            ]}));
        }

        return response;
    },
    getUsers: async (): Response<GetUsersResponse> => {
        const response = await UsersApi.getUsers();
        if (!response.error) {
            set({users: response.data});
        }

        return response;
    },
}));

export const getUserSelector = (userId: User["id"]|"me"): (state: UsersStore) => User|null => ({users, me}) => userId === "me" ? me : users.find((user) => user.id === userId) ?? null;

export default useUsers;
