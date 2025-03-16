import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {Avatar, Collapse, Empty, List, type CollapseProps} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import type {Folder} from "../api/folders";
import useFolders, {getChildrenFolders} from "../store/folders";
import CreateDropdown from "./create_dropdown";
import useEntries, {getFolderEntries} from "../store/entries";
import type {Entry} from "../api/entries";
import ListEntry from "./list_entry";
import UserAvatar from "./user_avatar";
import useUsers from "../store/users";

type Props = {
    folderId: Folder["id"];
};

const FolderCollapse: React.FC<Props> = ({folderId}) => {
    const childrenFolders = useFolders(useShallow(getChildrenFolders(folderId)));
    const folderEntries = useEntries(useShallow(getFolderEntries(folderId)));
    const {getEntries} = useEntries();
    const {me} = useUsers();

    useEffect(() => {
        if (!folderEntries.length) {
            getEntries();
        }
    }, [folderEntries]);

    const folderItems: CollapseProps["items"] = childrenFolders.map((childFolder, i) => {
        const avatars: React.ReactNode[] = childFolder.userIds
            .filter((userId) => userId !== me?.id)
            .map((userId) => <UserAvatar userId={userId}/>);

        return {
            key: i,
            showArrow: false,
            label: (
                <div>
                    <Trans>{childFolder.name}</Trans>
                    {avatars.length ? (
                        <Avatar.Group>
                            {avatars}
                        </Avatar.Group>
                    ) : null}
                    <CreateDropdown folderId={childFolder.id}/>
                </div>
            ),
            children: <FolderCollapse folderId={childFolder.id}/>,
        };
    });

    const renderEntry = (entry: Entry, i: number): React.ReactNode => <ListEntry key={i} entry={entry}/>;

    if (!folderItems.length && !folderEntries.length) {
        return (
            <Empty
                image={<FolderOpenOutlined/>}
                description={<Trans>No password saved</Trans>}
            >
                <CreateDropdown folderId={folderId}/>
            </Empty>
        );
    }

    return (
        <div>
            {childrenFolders.length ? (
                <Collapse
                    accordion={true}
                    items={folderItems}
                />
            ) : null}
            {folderEntries.length ? (
                <List
                    itemLayout="horizontal"
                    dataSource={folderEntries}
                    renderItem={renderEntry}
                />
            ) : null}
        </div>
    );
};

export default FolderCollapse;
