import {create} from "zustand";
import type {OkResponse, Response} from "../api/api";
import type {CreateEntryResponse, Entry, GetEntriesResponse, GetEntryResponse, UpdateEntryResponse} from "../api/entries";
import EntriesApi, {type GetEntriesInput} from "../api/entries";
import type {Folder} from "../api/folders";

type EntriesStore = {
    entries: Entry[];
    getEntries: (input?: GetEntriesInput) => Response<GetEntriesResponse>;
    deleteEntry: (entryId: Entry["id"]) => Response<OkResponse>;
    getEntry: (entryId: Entry["id"]) => Response<GetEntryResponse>;
    updateEntry: (entry: Entry) => Response<UpdateEntryResponse>;
    createEntry: (entry: Omit<Entry, "id">) => Response<CreateEntryResponse>;
};

const useEntries = create<EntriesStore>((set) => ({
    entries: [
        {
            id: 1,
            name: "test",
            username: "username",
            password: "password",
            folderId: 1,
        },
    ],
    getEntries: async (input): Response<GetEntriesResponse> => {
        const response = await EntriesApi.getEntries(input);
        if (!response.error) {
            set({entries: response.data});
        }

        return response;
    },
    deleteEntry: async (entryId): Response<OkResponse> => {
        const response = await EntriesApi.deleteEntry(entryId);
        if (!response.error) {
            set(({entries}) => ({entries: entries.filter(({id}) => id !== entryId)}));
        }

        return response;
    },
    getEntry: async (entryId): Response<GetEntryResponse> => {
        const response = await EntriesApi.getEntry(entryId);
        if (!response.error) {
            set(({entries}) => ({entries: entries.find(({id}) => id === response.data.id) ? entries.map((entry) => {
                if (entry.id === response.data.id) {
                    return response.data;
                }
                return entry;
            }) : [...entries, response.data]}));
        }

        return response;
    },
    updateEntry: async (entry): Response<UpdateEntryResponse> => {
        const response = await EntriesApi.updateEntry(entry);
        if (!response.error) {
            set(({entries}) => ({entries: entries.find(({id}) => id === response.data.id) ? entries.map((entry) => {
                if (entry.id === response.data.id) {
                    return response.data;
                }
                return entry;
            }) : [...entries, response.data]}));
        }

        return response;
    },
    createEntry: async (entry): Response<CreateEntryResponse> => {
        const response = await EntriesApi.createEntry(entry);
        if (!response.error) {
            set(({entries}) => ({entries: entries.find(({id}) => id === response.data.id) ? entries.map((entry) => {
                if (entry.id === response.data.id) {
                    return response.data;
                }
                return entry;
            }) : [...entries, response.data]}));
        }

        return response;
    }
}));

export const getFolderEntries = (folderId: Folder["id"]): (state: EntriesStore) => Entry[] => (state) => state.entries.filter((entry) => entry.folderId === folderId);

export const getEntrySelector = (entryId: Entry["id"]): (state: EntriesStore) => Entry|null => (state) => state.entries.find(({id}) => id === entryId) ?? null;

export default useEntries;
