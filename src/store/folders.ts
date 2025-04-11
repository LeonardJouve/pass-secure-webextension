import {useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult} from "@tanstack/react-query";
import type {CreateFolderInput, CreateFolderResponse, Folder, GetFolderResponse, GetFoldersInput, GetFoldersResponse, UpdateFolderInput, UpdateFolderResponse} from "../api/folders";
import FoldersApi from "../api/folders";
import type {OkResponse} from "../api/api";
import {useQueryError} from "./utils";
import useError from "./error";

const KEY = "folders";
const ALL = "all";

export const useGetFolder = (folderId: Folder["id"]): UseQueryResult<GetFolderResponse> => useQueryError(useQuery({
    queryKey: [KEY, folderId],
    queryFn: async () => await FoldersApi.getFolder(folderId),
}));

export const useGetFolders = <T = GetFoldersResponse>(input?: GetFoldersInput, select?: (response: GetFoldersResponse) => T): UseQueryResult<T> => useQueryError(useQuery({
    queryKey: [KEY, ALL, input],
    queryFn: async () => await FoldersApi.getFolders(input),
    select,
}));

export const useGetRootFolder = (input?: Omit<GetFoldersInput, "parentId">): UseQueryResult<Folder|null> => useGetFolders({
    ...input,
    parentId: null,
}, ([folder]) => folder ?? null);

export const useCreateFolder = (): UseMutationResult<CreateFolderResponse, string, CreateFolderInput> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: FoldersApi.createFolder,
        onSuccess: (data) => {
            queryClient.setQueryData([KEY, data.id], data);
            queryClient.invalidateQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};

export const useUpdateFolder = (): UseMutationResult<UpdateFolderResponse, string, UpdateFolderInput> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: FoldersApi.updateFolder,
        onSuccess: (data) => {
            queryClient.setQueryData([KEY, data.id], data);
            queryClient.invalidateQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};

export const useDeleteFolder = (): UseMutationResult<OkResponse, string, Folder["id"]> => {
    const queryClient = useQueryClient();
    const {setError} = useError();
    return useMutation({
        mutationFn: FoldersApi.deleteFolder,
        onSuccess: (_, folderId) => {
            queryClient.removeQueries({queryKey: [KEY, folderId]});
            queryClient.removeQueries({queryKey: [KEY, ALL]});
        },
        onError: setError,
    });
};
