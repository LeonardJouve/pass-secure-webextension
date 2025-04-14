import React from "react";
import {Avatar, Button, Collapse, Flex, List, Modal, Skeleton, Tooltip, type CollapseProps} from "antd";
import {DeleteOutlined, EditOutlined, FolderOpenOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import type {Folder} from "../api/folders";
import CreateDropdown from "./create_dropdown";
import type {Entry} from "../api/entries";
import ListEntry from "./list_entry";
import UserAvatar from "./user_avatar";
import useRouter, {Route} from "../store/router";
import {useGetUser} from "../store/users";
import {useDeleteFolder, useGetFolders, useGetRootFolder} from "../store/folders";
import {useGetEntries} from "../store/entries";

type Props = {
    folderId: Folder["id"];
    search: string;
};

const FolderCollapse: React.FC<Props> = ({folderId, search}) => {
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const {isLoading: isLoadingFolders, data: folders} = useGetFolders({parentId: folderId, search});
    const {isLoading: isLoadingEntries, data: entries} = useGetEntries({folderId, search});
    const {data: root} = useGetRootFolder();
    const deleteFolder = useDeleteFolder();
    const {data: me} = useGetUser("me");
    const {push} = useRouter();

    const folderItems: CollapseProps["items"] = folders?.map((folder, i) => {
        const handleEdit: React.MouseEventHandler = (e): void => {
            e.stopPropagation();
            push(Route.EDIT_FOLDER, {folderId: folder.id});
        };

        const avatars: React.ReactNode[] = folder.userIds
            .filter((userId) => userId !== me?.id)
            .map((userId) => <UserAvatar userId={userId}/>);

        return {
            key: i,
            showArrow: false,
            label: (
                <Flex align="center">
                    <Trans>{folder.name}</Trans>
                    <Flex
                        gap="small"
                        style={{marginLeft: "auto", marginRight: 0}}
                    >
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
                        <CreateDropdown folderId={folder.id}/>
                    </Flex>
                </Flex>
            ),
            children: (
                <FolderCollapse
                    folderId={folder.id}
                    search={search}
                />
            ),
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
            onOk: () => deleteFolder.mutate(folderId),
        });
    };

    if (folderItems?.length === 0 && entries?.length === 0) {
        return (
            <Flex gap="small" align="center" justify="center">
                <FolderOpenOutlined/>
                <Trans>No password</Trans>
                {folderId !== root?.id ? (
                    <>
                        <Tooltip title={<Trans>Delete Folder</Trans>}>
                            <Button
                                danger={true}
                                type="primary"
                                icon={<DeleteOutlined/>}
                                onClick={handleDelete}
                            />
                        </Tooltip>
                        {deleteModalContext}
                    </>
                ) : null}
            </Flex>
        );
    }

    return (
        <Flex vertical={true}>
            {folderItems?.length ? (
                <Collapse
                    accordion={true}
                    items={folderItems}
                />
            ) : null}
            {entries?.length ? (
                <List
                    itemLayout="horizontal"
                    dataSource={entries}
                    renderItem={renderEntry}
                />
            ) : null}
            {isLoadingFolders || isLoadingEntries ? (
                <Skeleton active={true}/>
            ) : null}
        </Flex>
    );
};

export default FolderCollapse;
