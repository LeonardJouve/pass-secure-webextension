import React, {useEffect, useState} from "react";
import {Button, Collapse, Divider, Dropdown, Input, type CollapseProps} from "antd";
import {FileAddOutlined, FolderAddOutlined, FolderOpenOutlined, PlusOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useFolders from "../store/folders";
import Profile from "./profile";
import useRouter, {Route} from "../store/router";

const App: React.FC = () => {
    const {t} = useLingui();
    const {folders, getFolders} = useFolders();
    const {push} = useRouter();
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

    const items: CollapseProps["items"] = folders.map((folder, i) => ({
        key: i,
        label: (
            <div>
                <Trans>{folder.name}</Trans>
                <Dropdown menu={{items: [
                    {
                        key: 1,
                        label: <Trans>New Folder</Trans>,
                        icon: <FolderAddOutlined/>,
                        onClick: () => push(Route.CREATE_FOLDER, {parentId: folder.id}),
                    },
                    {
                        key: 2,
                        icon: <FileAddOutlined/>,
                        label: <Trans>New Entry</Trans>,
                        onClick: () => push(Route.CREATE_ENTRY, {folderId: folder.id}),
                    },
                ]}}>
                    <Button
                        shape="circle"
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={() => push(Route.CREATE_ENTRY, {folderId: folder.id})}
                    />
                </Dropdown>
            </div>
        ),
        children: (
            <>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </>
        ),
    }));

    return (
        <div>
            <Input.Search
                placeholder={t({message: "Search"})}
                loading={isSearching}
                allowClear={true}
                onSearch={handleSearch}
            />
            <Profile/>
            <Divider/>
            {items.length ? <Collapse items={items} accordion={true}/> : (
                <div>
                    <FolderOpenOutlined/>
                    <Trans>No password saved</Trans>
                </div>
            )}
        </div>
    );
};

export default App;
