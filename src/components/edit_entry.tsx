import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import useRouter from "../store/router";
import useEntries, {getEntrySelector} from "../store/entries";
import UpsertEntry from "./upsert_entry";

const EditEntry: React.FC = () => {
    const {current, pop} = useRouter();
    const entryId = Number(current.params["entryId"]);
    const {getEntry} = useEntries();
    const entry = useEntries(useShallow(getEntrySelector(entryId)));

    useEffect(() => {
        if (!entryId) {
            pop();
        }
    }, [current]);

    useEffect(() => {
        if (!entry && entryId) {
            getEntry(entryId);
        }
    }, [entry, current]);

    if (!entryId || !entry) {
        return null;
    }

    return (
        <UpsertEntry entry={entry}/>
    );
};

export default EditEntry;
