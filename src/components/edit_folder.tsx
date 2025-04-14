import React, {useEffect} from "react";
import {Skeleton} from "antd";
import useRouter from "../store/router";
import UpsertFolder from "./upsert_folder";
import type {Folder} from "../api/folders";
import {useGetFolder, useUpdateFolder} from "../store/folders";

const EditFolder: React.FC = () => {
    const {getParam, pop} = useRouter();
    const folderId = getParam<number>("folderId");
    const {isLoading, data: folder} = useGetFolder(folderId ?? -1);
    const updateFolder = useUpdateFolder();

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [folderId]);

    if (isLoading) {
        return <Skeleton active={true}/>;
    }

    if (!folder) {
        return null;
    }

    const handleUpdate = async (values: Omit<Folder, "id"|"ownerId">): Promise<void> => await updateFolder.mutateAsync({
        ...values,
        id: folder.id,
    }).then(pop);

    return (
        <UpsertFolder
            folder={folder}
            onFinish={handleUpdate}
        />
    );
};

export default EditFolder;
