import React, {useEffect} from "react";
import useRouter from "../store/router";
import UpsertEntry from "./upsert_entry";

const CreateEntry: React.FC = () => {
    const {current, pop} = useRouter();
    const folderId = Number(current.params["folderId"]);

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [current]);

    if (!folderId) {
        return null;
    }

    return (
        <UpsertEntry folderId={folderId}/>
    );
};

export default CreateEntry;
