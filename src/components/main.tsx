import React, {useState} from "react";
import {Divider, Flex, Input} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {useLingui} from "@lingui/react/macro";
import Profile from "./profile";
import FolderCollapse from "./folder_collapse";
import CreateDropdown from "./create_dropdown";
import {useGetRootFolder} from "../store/folders";

const Main: React.FC = () => {
    const {t} = useLingui();
    const [search, setSearch] = useState<string>("");
    const {isLoading, data: root} = useGetRootFolder();

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
                {root ? <CreateDropdown folderId={root.id}/> : null}
                <Profile/>
            </Flex>
            <Divider/>
            <div style={{overflow: "scroll", padding: "0 15px 15px 15px"}}>
                {root ? (
                    <FolderCollapse
                        folderId={root.id}
                        search={search}
                    />
                ) : null}
                {isLoading ? (
                    <Flex
                        justify="center"
                        align="center"
                    >
                        <LoadingOutlined/>
                    </Flex>
                ) : null}
            </div>
        </Flex>
    );
};

export default Main;
