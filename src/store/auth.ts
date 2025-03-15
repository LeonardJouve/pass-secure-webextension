import {create} from "zustand";
import type {LoginInput, LoginResponse, RegisterInput} from "../api/auth";
import AuthApi from "../api/auth";
import type {OkResponse, Response} from "../api/api";

type AuthStore = {
    isLoggedIn: boolean;
    register: (input: RegisterInput) => Response<OkResponse>;
    login: (input: LoginInput) => Response<LoginResponse>;
    disconnect: () => void;
};

const useAuth = create<AuthStore>((set) => ({
    isLoggedIn: false,
    register: AuthApi.register,
    login: async (input): Response<LoginResponse> => {
        const response = await AuthApi.login(input);
        set({isLoggedIn: !response.error});

        return response;
    },
    disconnect: (): void => set({isLoggedIn: false}),
}));

export default useAuth;
