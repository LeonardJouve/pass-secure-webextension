import type {Response} from "./api";
import Api from "./api";
import type {Folder} from "./folders";

export type Entry = {
    id: number;
    name: string;
    folderId: Folder["id"];
};

export type GetEntriesInput = {
    search?: string;
};

export type GetEntriesResponse = Entry[];

class EntriesApi {
    static getEntries = async (input?: GetEntriesInput): Response<GetEntriesResponse> => await Api.fetch<GetEntriesResponse>("/entries", {method: "GET", body: input ? JSON.stringify(input) : undefined});
};

export default EntriesApi;
