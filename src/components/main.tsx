import React, {useState} from "react";
import {Divider, Flex, Input} from "antd";
import {useLingui} from "@lingui/react/macro";
import Profile from "./profile";
import FolderCollapse from "./folder_collapse";
import CreateDropdown from "./create_dropdown";
import {useGetRootFolder} from "../store/folders";

const Main: React.FC = () => {
    const {t} = useLingui();
    const [search, setSearch] = useState<string>("");
    const {data: root} = useGetRootFolder();

    if (!root) {
        return null;
    }

    return (
        <Flex
            vertical={true}
            style={{height: "100vh"}}
        >
            <Flex
                gap="small"
                style={{padding: "15px 15px 0 15px"}}
            >
                <Input.Search
                    placeholder={t({message: "Search"})}
                    allowClear={true}
                    value={search}
                    onSearch={setSearch}
                />
                <CreateDropdown folderId={root.id}/>
                <Profile/>
            </Flex>
            <Divider/>
            <div style={{overflow: "scroll", padding: "0 15px 15px 15px"}}>
                <FolderCollapse
                    folderId={root.id}
                    search={search}
                />
            </div>
        </Flex>
    );
};

export default Main;
