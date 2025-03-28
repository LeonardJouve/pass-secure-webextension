import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import useFolders, {getFolderSelector} from "../store/folders";
import useRouter from "../store/router";
import UpsertFolder from "./upsert_folder";
import type {Folder} from "../api/folders";

const EditFolder: React.FC = () => {
    const {current, pop} = useRouter();
    const folderId = Number(current.params["folderId"]);
    const {getFolder, updateFolder} = useFolders();
    const folder = useFolders(useShallow(getFolderSelector(folderId)));

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [current]);

    useEffect(() => {
        if (!folder && folderId) {
            getFolder(folderId);
        }
    }, [folder, current]);

    if (!folderId || !folder) {
        return null;
    }

    const handleUpdate = async (values: Omit<Folder, "id"|"ownerId">): Promise<void> => {
        const response = await updateFolder({
            ...values,
            id: folder.id,
        })

        if (!response.error) {
            pop();
        }
    };

    return (
        <UpsertFolder
            folder={folder}
            onFinish={handleUpdate}
        />
    );
};

export default EditFolder;
