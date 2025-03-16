import {create} from "zustand";
import type {Response} from "../api/api";
import type {Folder, GetFoldersInput, GetFoldersResponse} from "../api/folders";
import FoldersApi from "../api/folders";

type FoldersStore = {
    folders: Folder[];
    getFolders: (input?: GetFoldersInput) => Response<GetFoldersResponse>;
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
}));

export const getChildrenFolders = (folderId: number): (state: FoldersStore) => Folder[] => (state) => state.folders.filter(({parentId}) => parentId === folderId);

export const getRootFolder = (): (state: FoldersStore) => Folder|null => (state) => state.folders.find(({parentId}) => parentId === null) ?? null;

export default useFolders;
