import {create} from "zustand";
import type {Response} from "../api/api";
import UsersApi from "../api/users";
import type {GetMeResponse, User} from "../api/users";

type UsersStore = {
    me: User|null;
    getMe: () => Response<GetMeResponse>;
};

const useUsers = create<UsersStore>((set) => ({
    me: null,
    getMe: async (): Response<GetMeResponse> => {
        const response = await UsersApi.getMe();
        if (!response.error) {
            set({me: response.data});
        }

        return response;
    },
}));

export default useUsers;
