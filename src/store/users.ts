import {useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult} from "@tanstack/react-query";
import useAuth, {Status} from "./auth";
import type {OkResponse} from "../api/api";
import type {GetUserResponse, GetUsersResponse, UpdateMeInput, UpdateMeResponse, User} from "../api/users";
import {useQueryError} from "./utils";
import useError from "./error";
import UsersApi from "../api/users";

const KEY = "users";
const ALL = "all";

export const useGetUsers = (): UseQueryResult<GetUsersResponse> => useQueryError(useQuery({
    queryKey: [KEY, ALL],
    queryFn: UsersApi.getUsers,
}));

export const useGetUser = (userId: User["id"]|"me"): UseQueryResult<GetUserResponse> => useQueryError(useQuery({
    queryKey: [KEY, userId],
    queryFn: userId === "me" ? UsersApi.getMe : () => UsersApi.getUser(userId),
}));

export const useUpdateMe = (): UseMutationResult<UpdateMeResponse, string, UpdateMeInput> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: UsersApi.updateMe,
        onSuccess: (data) => {
            queryClient.setQueryData([KEY, "me"], data);
            queryClient.setQueryData([KEY, data.id], data);
            queryClient.invalidateQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};

export const useDeleteMe = (): UseMutationResult<OkResponse, string, void> => {
    const queryClient = useQueryClient();
    const {disconnect} = useAuth();
    const {setError} = useError();
    return useMutation({
        mutationFn: UsersApi.deleteMe,
        onSuccess: () => {
            disconnect();
            queryClient.removeQueries();
        },
        onError: setError,
    });
};
