import React, { useEffect } from "react";
import useRouter from "../store/router";
import UpsertFolder from "./upsert_folder";

const CreateFolder: React.FC = () => {
    const {current, pop} = useRouter();
    const parentId = Number(current.params["parentId"]);

    useEffect(() => {
        if (!parentId) {
            pop();
        }
    }, [current]);

    if (!parentId) {
        return null;
    }

    return (
        <UpsertFolder parentId={parentId}/>
    );
};

export default CreateFolder;
