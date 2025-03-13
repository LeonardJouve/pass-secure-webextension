import {create} from "zustand";
import type {LoginInput, LoginResponse, RegisterInput} from "../api/auth";
import Auth from "../api/auth";

type AuthStore = {
    isLoggedIn: boolean;
    register: (input: RegisterInput) => void;
    login: (input: LoginInput) => LoginResponse;
};

const useAuth = create<AuthStore>((set) => ({
    isLoggedIn: false,
    user: null,
    register: Auth.register,
    login: async (input): LoginResponse => {
        const response = await Auth.login(input);
        set({isLoggedIn: !response.error});

        return response;
    },
}));

export default useAuth;
