import {create} from "zustand";
import type {OkResponse, Response} from "../api/api";
import type {CreateFolderResponse, Folder, GetFolderResponse, GetFoldersInput, GetFoldersResponse, UpdateFolderResponse} from "../api/folders";
import FoldersApi from "../api/folders";

type FoldersStore = {
    folders: Folder[];
    getFolders: (input?: GetFoldersInput) => Response<GetFoldersResponse>;
    getFolder: (folderId: Folder["id"]) => Response<GetFolderResponse>;
    createFolder: (folder: Omit<Folder, "id"|"ownerId">) => Response<CreateFolderResponse>;
    updateFolder: (folder: Omit<Folder, "ownerId">) => Response<UpdateFolderResponse>;
    deleteFolder: (folderId: Folder["id"]) => Response<OkResponse>;
};

const useFolders = create<FoldersStore>((set) => ({
    folders: [],
    getFolders: async (input): Response<GetFoldersResponse> => {
        const response = await FoldersApi.getFolders(input);
        if (!response.error) {
            set({folders: response.data});
        }

        return response;
    },
    getFolder: async (folderId): Response<GetFolderResponse> => {
        const response = await FoldersApi.getFolder(folderId);
        if (!response.error) {
            set(({folders}) => ({folders: folders.find(({id}) => id === response.data.id) ? folders.map((folder) => {
                if (folder.id === response.data.id) {
                    return response.data;
                }
                return folder;
            }) : [...folders, response.data]}));
        }

        return response;
    },
    createFolder: async (folder): Response<CreateFolderResponse> => {
        const response = await FoldersApi.createFolder(folder);
        if (!response.error) {
            set(({folders}) => ({folders: folders.find(({id}) => id === response.data.id) ? folders.map((folder) => {
                if (folder.id === response.data.id) {
                    return response.data;
                }
                return folder;
            }) : [...folders, response.data]}));
        }

        return response;
    },
    updateFolder: async (folder): Response<UpdateFolderResponse> => {
        const response = await FoldersApi.updateFolder(folder);
        if (!response.error) {
            set(({folders}) => ({folders: folders.find(({id}) => id === response.data.id) ? folders.map((folder) => {
                if (folder.id === response.data.id) {
                    return response.data;
                }
                return folder;
            }) : [...folders, response.data]}));
        }

        return response;
    },
    deleteFolder: async (folderId): Response<OkResponse> => {
        const response = await FoldersApi.deleteFolder(folderId);
        if (!response.error) {
            set(({folders}) => ({folders: folders.filter(({id}) => id !== folderId)}));
        }

        return response;
    },
}));

export const getChildrenFolders = (folderId: Folder["id"]): (state: FoldersStore) => Folder[] => (state) => state.folders.filter(({parentId}) => parentId === folderId);

export const getRootFolder = (): (state: FoldersStore) => Folder|null => (state) => state.folders.find(({parentId}) => parentId === null) ?? null;

export const getFolderSelector = (folderId: Folder["id"]): (state: FoldersStore) => Folder|null => (state) => state.folders.find(({id}) => id === folderId) ?? null;

export default useFolders;
