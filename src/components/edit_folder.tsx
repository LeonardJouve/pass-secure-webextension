import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import useFolders, {getFolderSelector} from "../store/folders";
import useRouter from "../store/router";
import UpsertFolder from "./upsert_folder";

const EditFolder: React.FC = () => {
    const {current, pop} = useRouter();
    const folderId = Number(current.params["folderId"]);
    const {getFolder} = useFolders();
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

    return (
        <UpsertFolder folder={folder}/>
    );
};

export default EditFolder;
