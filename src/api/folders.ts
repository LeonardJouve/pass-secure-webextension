import type {User} from "./users";
import type {Response} from "./api";
import Api from "./api";

export type Folder = {
    id: number;
    userIds: User["id"][];
    ownerId: User["id"];
    name: string;
    parentId: Folder["id"]|null;
};

export type GetFoldersInput = {
    search?: string;
};

export type GetFoldersResponse = Folder[];

export type GetFolderResponse = Folder;

export type CreateFolderResponse = Folder;

class FoldersApi {
    static getFolders = async (input?: GetFoldersInput): Response<GetFoldersResponse> => await Api.fetch<GetFoldersResponse>("/folders", {method: "GET", body: input ? JSON.stringify(input) : undefined});
    static getFolder = async (folderId: Folder["id"]): Response<GetFolderResponse> => await Api.fetch<GetFolderResponse>(`/folders/${folderId}`, {method: "GET"});
    static createFolder = async (folder: Omit<Folder, "id"|"ownerId">): Response<CreateFolderResponse> => await Api.fetch<CreateFolderResponse>("/folders", {method: "GET", body: JSON.stringify(folder)});
};

export default FoldersApi;
