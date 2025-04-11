import React, {useEffect} from "react";
import useRouter from "../store/router";
import UpsertEntry from "./upsert_entry";
import type {CreateEntryInput} from "../api/entries";
import {useCreateEntry} from "../store/entries";

const CreateEntry: React.FC = () => {
    const {getParam, pop} = useRouter();
    const createEntry = useCreateEntry();
    const folderId = getParam<number>("folderId");

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [folderId]);

    if (!folderId) {
        return null;
    }

    const handleCreate = async (values: CreateEntryInput): Promise<void> => {
        await createEntry.mutateAsync(values);
        pop();
    };

    return (
        <UpsertEntry
            entry={{folderId}}
            onFinish={handleCreate}
        />
    );
};

export default CreateEntry;
