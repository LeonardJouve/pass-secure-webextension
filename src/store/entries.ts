import {create} from "zustand";
import type {OkResponse, Response} from "../api/api";
import type {Entry, GetEntriesResponse, GetEntryResponse} from "../api/entries";
import EntriesApi, {type GetEntriesInput} from "../api/entries";
import type {Folder} from "../api/folders";

type EntriesStore = {
    entries: Entry[];
    getEntries: (input?: GetEntriesInput) => Response<GetEntriesResponse>;
    deleteEntry: (entryId: Entry["id"]) => Response<OkResponse>;
    getEntry: (entryId: Entry["id"]) => Response<GetEntryResponse>;
};

const useEntries = create<EntriesStore>((set, get) => ({
    entries: [],
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
    getEntry: async (entryId: Entry["id"]): Response<GetEntryResponse> => {
        const response = await EntriesApi.getEntry(entryId);
        if (!response.error && !get().entries.some(({id}) => id === entryId)) {
            set(({entries}) => ({entries: [...entries, response.data]}))
        }

        return response;
    }
}));

export const getFolderEntries = (folderId: Folder["id"]): (state: EntriesStore) => Entry[] => (state) => state.entries.filter((entry) => entry.folderId === folderId);

export const getEntrySelector = (entryId: Entry["id"]): (state: EntriesStore) => Entry|null => (state) => state.entries.find(({id}) => id === entryId) ?? null;

export default useEntries;
