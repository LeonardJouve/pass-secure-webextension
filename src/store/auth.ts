import {create} from "zustand";
import {useMutation, type UseMutationResult} from "@tanstack/react-query";
import AuthApi from "../api/auth";
import type {OkResponse} from "../api/api";
import type {LoginInput, LoginResponse, RegisterInput} from "../api/auth";

export enum Status {
    DISCONNECTED,
    LOCKED,
    CONNECTED,
}

type AuthStore = {
    status: Status;
    connect: () => void;
    disconnect: () => void;
    lock: () => void;
};

const useAuth = create<AuthStore>((set) => ({
    status: Status.CONNECTED,
    connect: (): void => set({status: Status.CONNECTED}),
    disconnect: (): void => set({status: Status.DISCONNECTED}),
    lock: (): void => set({status: Status.LOCKED}),
}));

export const useLogin = (): UseMutationResult<LoginResponse, string, LoginInput> => {
    const {connect} = useAuth();
    return useMutation({
        mutationFn: AuthApi.login,
        onSuccess: connect,
    });
};

export const useRegister = (): UseMutationResult<OkResponse, string, RegisterInput> => useMutation({mutationFn: AuthApi.register});

export default useAuth;
