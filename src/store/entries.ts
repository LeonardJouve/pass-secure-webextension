import {useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult} from "@tanstack/react-query";
import useError from "./error";
import {useQueryError} from "./utils";
import EntriesApi, {type GetEntriesInput} from "../api/entries";
import type {OkResponse} from "../api/api";
import type {CreateEntryInput, CreateEntryResponse, Entry, GetEntriesResponse, GetEntryResponse, UpdateEntryResponse} from "../api/entries";

const KEY = "entries";
const ALL = "all";

export const useGetEntry = (entryId: Entry["id"]): UseQueryResult<GetEntryResponse> => useQueryError(useQuery({
    queryKey: [KEY, entryId],
    queryFn: async () => await EntriesApi.getEntry(entryId),
}));

export const useGetEntries = (input?: GetEntriesInput): UseQueryResult<GetEntriesResponse> => useQueryError(useQuery({
    queryKey: [KEY, ALL, input],
    queryFn: async () => await EntriesApi.getEntries(input),
}));

export const useCreateEntry = (): UseMutationResult<CreateEntryResponse, string, CreateEntryInput> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: EntriesApi.createEntry,
        onSuccess: (data) => {
            queryClient.setQueryData([KEY, data.id], data);
            queryClient.invalidateQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};

export const useUpdateEntry = (): UseMutationResult<UpdateEntryResponse, string, Entry> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: EntriesApi.updateEntry,
        onSuccess: (data) => {
            queryClient.setQueryData([KEY, data.id], data);
            queryClient.invalidateQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};

export const useDeleteEntry = (): UseMutationResult<OkResponse, string, Entry["id"]> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: EntriesApi.deleteEntry,
        onSuccess: (_, entryId) => {
            queryClient.removeQueries({queryKey: [KEY, entryId]});
            queryClient.invalidateQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};
