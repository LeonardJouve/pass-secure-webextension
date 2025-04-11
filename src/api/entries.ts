import type {OkResponse} from "./api";
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
    folderId?: Entry["folderId"];
};

export type GetEntriesResponse = Entry[];

export type GetEntryResponse = Entry;

export type UpdateEntryResponse = Entry;

export type CreateEntryInput = Omit<Entry, "id">;

export type CreateEntryResponse = Entry;

class EntriesApi {
    static getEntries = async (input?: GetEntriesInput): Promise<GetEntriesResponse> => await Api.fetch<GetEntriesResponse>("/entries", {method: "GET", body: input ? JSON.stringify(input) : undefined});
    static getEntry = async (entryId: Entry["id"]): Promise<GetEntryResponse> => await Api.fetch<GetEntryResponse>(`/entries/${entryId}`, {method: "GET"});
    static createEntry = async (entry: CreateEntryInput): Promise<CreateEntryResponse> => await Api.fetch<CreateEntryResponse>("/entries", {method: "POST", body: JSON.stringify(entry)});
    static deleteEntry = async (entryId: Entry["id"]): Promise<OkResponse> => await Api.fetch<OkResponse>(`/entries/${entryId}`, {method: "DELETE"});
    static updateEntry = async ({id, ...props}: Entry): Promise<UpdateEntryResponse> => await Api.fetch<UpdateEntryResponse>(`/entries/${id}`, {method: "PUT", body: JSON.stringify(props)});
};

export default EntriesApi;
