import React, { useEffect } from "react";
import {Flex} from "antd";
import RouterBack from "./router_back";
import useRouter from "../store/router";
import useFolders, { getFolderSelector } from "../store/folders";
import { useShallow } from "zustand/shallow";

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
            getFolder(folderId)
        }
    }, [folder, current]);

    if (!folder) {
        return null;
    }

    return (
        <Flex vertical={true}>
            <RouterBack/>
            {folder.name}
        </Flex>
    );
};

export default EditFolder;
