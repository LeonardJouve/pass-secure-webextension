import type {User} from "./users";
import type {Response} from "./api";
import Api from "./api";

export type Folder = {
    id: User["id"];
    userIds: User["id"][];
    ownerId: User["id"];
    name: string;
    parentId: Folder["id"]|null;
};

export type GetFoldersInput = {
    search?: string;
};

export type GetFoldersResponse = Folder[];

class FoldersApi {
    static getFolders = async (input?: GetFoldersInput): Response<GetFoldersResponse> => await Api.fetch<GetFoldersResponse>("/folders", {method: "GET", body: input ? JSON.stringify(input) : undefined});
};

export default FoldersApi;
