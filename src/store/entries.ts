import {create} from "zustand";
import type {OkResponse, Response} from "../api/api";
import type {Entry, GetEntriesResponse} from "../api/entries";
import EntriesApi, {type GetEntriesInput} from "../api/entries";

type EntriesStore = {
    entries: Entry[];
    getEntries: (input?: GetEntriesInput) => Response<GetEntriesResponse>;
    deleteEntry: (entryId: Entry["id"]) => Response<OkResponse>;
};

const useEntries = create<EntriesStore>((set) => ({
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
}));

export const getFolderEntries = (folderId: number): (state: EntriesStore) => Entry[] => (state) => state.entries.filter((entry) => entry.folderId === folderId);

export default useEntries;
