import React, {useEffect} from "react";
import useRouter from "../store/router";
import UpsertFolder from "./upsert_folder";
import type {Folder} from "../api/folders";
import {useGetFolder, useUpdateFolder} from "../store/folders";

const EditFolder: React.FC = () => {
    const {getParam, pop} = useRouter();
    const folderId = getParam<number>("folderId");
    const {data: folder} = useGetFolder(folderId ?? -1);
    const updateFolder = useUpdateFolder();

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [folderId]);

    if (!folder) {
        return null;
    }

    const handleUpdate = async (values: Omit<Folder, "id"|"ownerId">): Promise<void> => {
        await updateFolder.mutateAsync({
            ...values,
            id: folder.id,
        });
        pop();
    };

    return (
        <UpsertFolder
            folder={folder}
            onFinish={handleUpdate}
        />
    );
};

export default EditFolder;
