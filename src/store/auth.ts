import {create} from "zustand";
import type {LoginInput, LoginResponse, RegisterInput} from "../api/auth";
import AuthApi from "../api/auth";
import type {OkResponse, Response} from "../api/api";

export enum Status {
    DISCONNECTED,
    LOCKED,
    CONNECTED,
}

type AuthStore = {
    status: Status;
    register: (input: RegisterInput) => Response<OkResponse>;
    login: (input: LoginInput) => Response<LoginResponse>;
    disconnect: () => void;
    unlock: () => void;
};

const useAuth = create<AuthStore>((set) => ({
    status: Status.CONNECTED,
    register: AuthApi.register,
    login: async (input): Response<LoginResponse> => {
        const response = await AuthApi.login(input);
        if (!response.error) {
            set({status: Status.CONNECTED});
        }

        return response;
    },
    disconnect: (): void => set({status: Status.DISCONNECTED}),
    unlock: (): void => set({status: Status.CONNECTED}),
}));

export default useAuth;
