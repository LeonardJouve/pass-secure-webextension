import type {User} from "./users";
import type {OkResponse} from "./api";
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
    parentId?: Folder["parentId"];
};

export type GetFoldersResponse = Folder[];

export type GetFolderResponse = Folder;

export type CreateFolderInput = Omit<Folder, "id"|"ownerId">;

export type CreateFolderResponse = Folder;

export type UpdateFolderInput = Omit<Folder, "ownerId">;

export type UpdateFolderResponse = Folder;

class FoldersApi {
    static getFolders = async (input?: GetFoldersInput): Promise<GetFoldersResponse> => await Api.fetch<GetFoldersResponse>("/folders", {method: "GET", body: input ? JSON.stringify(input) : undefined});
    static getFolder = async (folderId: Folder["id"]): Promise<GetFolderResponse> => await Api.fetch<GetFolderResponse>(`/folders/${folderId}`, {method: "GET"});
    static createFolder = async (folder: CreateFolderInput): Promise<CreateFolderResponse> => await Api.fetch<CreateFolderResponse>("/folders", {method: "POST", body: JSON.stringify(folder)});
    static updateFolder = async ({id, ...props}: UpdateFolderInput): Promise<UpdateFolderResponse> => await Api.fetch(`/folders/${id}`, {method: "PUT", body: JSON.stringify(props)});
    static deleteFolder = async (folderId: Folder["id"]): Promise<OkResponse> => await Api.fetch(`/folders/${folderId}`, {method: "DELETE"});
};

export default FoldersApi;
