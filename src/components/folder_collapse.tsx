import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {Avatar, Button, Collapse, Flex, List, Modal, Tooltip, type CollapseProps} from "antd";
import {DeleteOutlined, EditOutlined, FolderOpenOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import type {Folder} from "../api/folders";
import useFolders, {getChildrenFolders} from "../store/folders";
import CreateDropdown from "./create_dropdown";
import useEntries, {getFolderEntries} from "../store/entries";
import type {Entry} from "../api/entries";
import ListEntry from "./list_entry";
import UserAvatar from "./user_avatar";
import useUsers from "../store/users";
import useRouter, {Route} from "../store/router";

type Props = {
    folderId: Folder["id"];
};

const FolderCollapse: React.FC<Props> = ({folderId}) => {
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const childrenFolders = useFolders(useShallow(getChildrenFolders(folderId)));
    const folderEntries = useEntries(useShallow(getFolderEntries(folderId)));
    const {deleteFolder} = useFolders();
    const {getEntries} = useEntries();
    const {me} = useUsers();
    const {push} = useRouter();

    useEffect(() => {
        if (!folderEntries.length) {
            getEntries();
        }
    }, [folderEntries]);

    const folderItems: CollapseProps["items"] = childrenFolders.map((childFolder, i) => {
        const handleEdit: React.MouseEventHandler = (e): void => {
            e.stopPropagation();
            push(Route.EDIT_FOLDER, {folderId: childFolder.id});
        };

        const avatars: React.ReactNode[] = childFolder.userIds
            .filter((userId) => userId !== me?.id)
            .map((userId) => <UserAvatar userId={userId}/>);

        return {
            key: i,
            showArrow: false,
            label: (
                <Flex align="center">
                    <Trans>{childFolder.name}</Trans>
                    <Flex gap="small" style={{marginLeft: "auto", marginRight: 0}}>
                        {avatars.length ? (
                            <Avatar.Group>
                                {avatars}
                            </Avatar.Group>
                        ) : null}
                        <Tooltip title={<Trans>Edit</Trans>}>
                            <Button
                                type="link"
                                icon={<EditOutlined/>}
                                onClick={handleEdit}
                            />
                        </Tooltip>
                        <CreateDropdown folderId={childFolder.id}/>
                    </Flex>
                </Flex>
            ),
            children: <FolderCollapse folderId={childFolder.id}/>,
        };
    });

    const renderEntry = (entry: Entry, i: number): React.ReactNode => <ListEntry key={i} entry={entry}/>;

    const handleDelete = (): void => {
        deleteModal.confirm({
            title: <Trans>Delete Folder</Trans>,
            icon: <DeleteOutlined/>,
            content: <Trans>Are you sure you want to <strong>Delete permanently</strong> this Folder</Trans>,
            okText: <Trans>Ok</Trans>,
            cancelText: <Trans>No</Trans>,
            okType: "danger",
            okButtonProps: {type: "primary"},
            onOk: () => {
                deleteFolder(folderId);
            },
        });
    };

    if (!folderItems.length && !folderEntries.length) {
        return (
            <Flex gap="small" align="center" justify="center">
                <FolderOpenOutlined/>
                <Trans>No password</Trans>
                <Tooltip title={<Trans>Delete Folder</Trans>}>
                    <Button
                        danger={true}
                        type="primary"
                        icon={<DeleteOutlined/>}
                        onClick={handleDelete}
                    />
                </Tooltip>
                {deleteModalContext}
            </Flex>
        );
    }

    return (
        <Flex vertical={true}>
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
        </Flex>
    );
};

export default FolderCollapse;
