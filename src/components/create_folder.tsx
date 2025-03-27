import React, {useEffect} from "react";
import useRouter, {Route} from "../store/router";
import useFolders from "../store/folders";
import UpsertFolder from "./upsert_folder";
import type {Folder} from "../api/folders";

const CreateFolder: React.FC = () => {
    const {current, pop, replace} = useRouter();
    const {createFolder} = useFolders();
    const parentId = Number(current.params["parentId"]);

    useEffect(() => {
        if (!parentId) {
            pop();
        }
    }, [current]);

    if (!parentId) {
        return null;
    }

    const handleCreate = async (values: Omit<Folder, "id"|"ownerId">): Promise<void> => {
        const response = await createFolder(values);

        if (!response.error) {
            replace(Route.MAIN);
        }
    }

    return (
        <UpsertFolder
            folder={{parentId}}
            onFinish={handleCreate}
        />
    );
};

export default CreateFolder;
