import React, {useEffect, useState} from "react";
import {Badge, Button, Collapse, Divider, Dropdown, Empty, Input, type CollapseProps} from "antd";
import {FileAddOutlined, FolderAddOutlined, FolderOpenOutlined, PlusOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useFolders from "../store/folders";
import Profile from "./profile";
import useRouter, {Route} from "../store/router";
import type {Folder} from "../api/folders";

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

    const getCreateDropdown = (folder: Folder): React.ReactNode => (
        <Dropdown menu={{items: [
            {
                key: 1,
                label: <Trans>Create Folder</Trans>,
                icon: <FolderAddOutlined/>,
                onClick: () => push(Route.CREATE_FOLDER, {parentId: folder.id}),
            },
            {
                key: 2,
                icon: <FileAddOutlined/>,
                label: <Trans>Create Entry</Trans>,
                onClick: () => push(Route.CREATE_ENTRY, {folderId: folder.id}),
            },
        ]}}>
            <Button
                shape="circle"
                type="primary"
                icon={<PlusOutlined/>}
                onClick={(e) => e.stopPropagation()}
            />
        </Dropdown>
    );

    const handleSearch = async (search: string): Promise<void> => {
        setIsSearching(true);
        await getFolders({search});
        setIsSearching(false);
    };

    const getFolderEntries = (folderId: number): React.ReactNode[] => [<span key={1}>{folderId}</span>, <span key={2}>2</span>, <span key={3}>3</span>];

    const items: CollapseProps["items"] = folders.map((folder, i) => ({
        key: i,
        label: (
            <div>
                <Badge count={getFolderEntries(folder.id).length}>
                    <Trans>{folder.name}</Trans>
                </Badge>
                {getCreateDropdown(folder)}
            </div>
        ),
        children: getFolderEntries(folder.id),
    }));

    const rootFolder = folders.find((folder) => folder.parentId === null);

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
                <Empty
                    image={<FolderOpenOutlined/>}
                    description={<Trans>No password saved</Trans>}
                >
                    {rootFolder ? getCreateDropdown(rootFolder) : null}
                </Empty>
            )}
        </div>
    );
};

export default App;
