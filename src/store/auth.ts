import {create} from "zustand";
import type {LoginInput, LoginResponse, RegisterInput} from "../api/auth";
import Auth from "../api/auth";
import type {OkResponse, Response} from "../api/api";

type AuthStore = {
    isLoggedIn: boolean;
    register: (input: RegisterInput) => Response<OkResponse>;
    login: (input: LoginInput) => Response<LoginResponse>;
};

const useAuth = create<AuthStore>((set) => ({
    isLoggedIn: false,
    register: Auth.register,
    login: async (input): Response<LoginResponse> => {
        const response = await Auth.login(input);
        set({isLoggedIn: !response.error});

        return response;
    },
}));

export default useAuth;
