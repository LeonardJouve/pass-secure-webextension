import React, {useEffect, useState} from "react";
import {useShallow} from "zustand/shallow";
import {Divider, Flex, Input} from "antd";
import {useLingui} from "@lingui/react/macro";
import useFolders, {getRootFolder} from "../store/folders";
import Profile from "./profile";
import FolderCollapse from "./folder_collapse";
import CreateDropdown from "./create_dropdown";

const App: React.FC = () => {
    const {t} = useLingui();
    const rootFolder = useFolders(useShallow(getRootFolder()));
    const {folders, getFolders} = useFolders();
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        if (!folders.length) {
            getFolders();
        }
    }, [folders]);

    const handleSearch = async (search: string): Promise<void> => {
        setIsSearching(true);
        await getFolders({search});
        setIsSearching(false);
    };

    if (!rootFolder) {
        return null;
    }

    return (
        <Flex vertical={true} style={{height: "100vh"}}>
            <Flex gap="small" style={{padding: "15px 15px 0 15px"}}>
                <Input.Search
                    placeholder={t({message: "Search"})}
                    loading={isSearching}
                    allowClear={true}
                    onSearch={handleSearch}
                />
                <CreateDropdown folderId={rootFolder.id}/>
                <Profile/>
            </Flex>
            <Divider/>
            <div style={{overflow: "scroll", padding: "0 15px 15px 15px"}}>
                <FolderCollapse folderId={rootFolder.id}/>
            </div>
        </Flex>
    );
};

export default App;
