import type {OkResponse, Response} from "./api";
import Api from "./api";
import type {Folder} from "./folders";

export type Entry = {
    id: number;
    name: string;
    username: string;
    password: string;
    url?: string;
    folderId: Folder["id"];
};

export type GetEntriesInput = {
    search?: string;
};

export type GetEntriesResponse = Entry[];

class EntriesApi {
    static getEntries = async (input?: GetEntriesInput): Response<GetEntriesResponse> => await Api.fetch<GetEntriesResponse>("/entries", {method: "GET", body: input ? JSON.stringify(input) : undefined});
    static deleteEntry = async (entryId: Entry["id"]): Response<OkResponse> => await Api.fetch<OkResponse>(`/entries/${entryId}`, {method: "DELETE"});
};

export default EntriesApi;
