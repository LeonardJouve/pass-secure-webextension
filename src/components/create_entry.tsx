import React, {useEffect} from "react";
import useRouter from "../store/router";
import UpsertEntry from "./upsert_entry";
import type {Entry} from "../api/entries";
import useEntries from "../store/entries";

const CreateEntry: React.FC = () => {
    const {current, pop} = useRouter();
    const {createEntry} = useEntries();
    const folderId = Number(current.params["folderId"]);

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [current]);

    if (!folderId) {
        return null;
    }

    const handleCreate = async (values: Omit<Entry, "id">): Promise<void> => {
        const response = await createEntry(values);

        if (!response.error) {
            pop();
        }
    };

    return (
        <UpsertEntry
            entry={{folderId}}
            onFinish={handleCreate}
        />
    );
};

export default CreateEntry;
