import React, {useEffect} from "react";
import useRouter from "../store/router";
import UpsertFolder from "./upsert_folder";
import type {CreateFolderInput} from "../api/folders";
import {useCreateFolder} from "../store/folders";

const CreateFolder: React.FC = () => {
    const {getParam, pop} = useRouter();
    const createFolder = useCreateFolder();
    const parentId = getParam<number>("parentId");

    useEffect(() => {
        if (!parentId) {
            pop();
        }
    }, [parentId]);

    if (!parentId) {
        return null;
    }

    const handleCreate = async (values: CreateFolderInput): Promise<void> => await createFolder.mutateAsync(values).then(pop);

    return (
        <UpsertFolder
            folder={{parentId}}
            onFinish={handleCreate}
        />
    );
};

export default CreateFolder;
