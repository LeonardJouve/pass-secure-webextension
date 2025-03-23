import React, {useEffect, useState} from "react";
import browser from "webextension-polyfill";
import {Button, Flex, Input, message, Modal, Select, Tooltip} from "antd";
import {CheckOutlined, CopyOutlined, DeleteOutlined, EditOutlined, GlobalOutlined, RollbackOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import {useShallow} from "zustand/shallow";
import useRouter from "../store/router";
import RouterBack from "./router_back";
import useEntries, {getEntrySelector} from "../store/entries";
import PasswordGenerator from "./password_generator";
import type {Folder} from "../api/folders";
import useFolders from "../store/folders";

const EntryView: React.FC = () => {
    const {t} = useLingui();
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const [overwriteModal, overwriteModalContext] = Modal.useModal();
    const [copyMessage, copyMessageContext] = message.useMessage();
    const {current, pop} = useRouter();
    const {deleteEntry, getEntry, updateEntry} = useEntries();
    const {folders, getFolders} = useFolders();
    const [isEditing, setIsEditing] = useState<boolean>(Boolean(current.params["isEditing"]));
    const entryId = Number(current.params["entryId"]);
    const entry = useEntries(useShallow(getEntrySelector(entryId)));
    const [name, setName] = useState<string>(entry?.name ?? "");
    const [username, setUsername] = useState<string>(entry?.username ?? "");
    const [password, setPassword] = useState<string>(entry?.password ?? "");
    const [url, setUrl] = useState<string|undefined>(entry?.url);
    const [folderId, setFolderId] = useState<Folder["id"]>(entry?.folderId ?? 0);

    useEffect(() => {
        if (!entryId) {
            pop();
        }
    }, [current]);

    useEffect(() => {
        if (!entry && entryId) {
            getEntry(entryId);
        }

        if (entry) {
            setName(entry.name);
            setUsername(entry.username);
            setPassword(entry.password);
            setUrl(entry.url);
            setFolderId(entry.folderId);
        }
    }, [entry, current]);

    useEffect(() => {
        if (!folders) {
            getFolders();
        }
    }, [folders]);

    if (!entry) {
        return null;
    }

    const handleDelete = (): void => {
        deleteModal.confirm({
            title: <Trans>Delete Entry</Trans>,
            icon: <DeleteOutlined/>,
            content: <Trans>Are you sure you want to <strong>Delete permanently</strong> this Entry</Trans>,
            okText: <Trans>Ok</Trans>,
            cancelText: <Trans>No</Trans>,
            okType: "danger",
            okButtonProps: {type: "primary"},
            onOk: () => {
                deleteEntry(entryId);
            },
        });
    };

    const handleName: React.ChangeEventHandler<HTMLInputElement> = (e) => setName(e.currentTarget.value);

    const handleUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => setUsername(e.currentTarget.value);

    const handleUrl: React.ChangeEventHandler<HTMLInputElement> = (e) => setUrl(e.currentTarget.value);

    const handleEdit = (): void => setIsEditing(!isEditing);

    const handleSave = (): void => {
        overwriteModal.confirm({
            title: <Trans>Overwrite</Trans>,
            icon: <EditOutlined/>,
            content: <Trans>Are you sure you want to <strong>Overwrite</strong> current entry</Trans>,
            okText: <Trans>Ok</Trans>,
            okType: "danger",
            okButtonProps: {type: "primary"},
            cancelText: <Trans>No</Trans>,
            onOk: () => {
                setIsEditing(false);
                updateEntry({
                    id: entry.id,
                    name,
                    username,
                    password,
                    url,
                    folderId,
                });
            },
        });
    };

    const handleCopyUsername = (): void => {
        navigator.clipboard.writeText(username);
        copyMessage.info(<Trans>Username copied !</Trans>);
    };

    const handleOpen = (): void => {
        browser.tabs.create({url: entry.url});
    };

    const folderOptions = folders.map(({id, name, parentId}) => ({
        label: parentId === null ? t({message: "<default>"}) : name,
        value: id,
    }));

    return (
        <Flex vertical={true}>
            <RouterBack/>
            <Input
                placeholder={t({message: "Name"})}
                value={name}
                onChange={handleName}
                disabled={!isEditing}
            />
            <Input
                placeholder={t({message: "Username"})}
                value={username}
                onChange={handleUsername}
                disabled={!isEditing}
                suffix={isEditing ? null : (
                    <Button
                        type="dashed"
                        icon={<CopyOutlined/>}
                        onClick={handleCopyUsername}
                    />
                )}
            />
            <Input
                type="url"
                placeholder={t({message: "URL"})}
                value={url}
                onChange={handleUrl}
                disabled={!isEditing}
                suffix={isEditing ? null : (
                    <Button
                        type="link"
                        icon={<GlobalOutlined/>}
                        onClick={handleOpen}
                    />
                )}
            />
            <Select
                options={folderOptions}
                value={folderId}
                onSelect={setFolderId}
                disabled={!isEditing}
            />
            <PasswordGenerator
                password={password}
                setPassword={setPassword}
                disabled={!isEditing}
            />
            {isEditing ? null : (
                <Tooltip title={<Trans>Delete</Trans>}>
                    <Button
                        danger={true}
                        icon={<DeleteOutlined/>}
                        type="primary"
                        onClick={handleDelete}
                    />
                </Tooltip>
            )}
            {isEditing ? (
                <Flex gap="small">
                    <Tooltip title={<Trans>Save</Trans>}>
                        <Button
                            icon={<CheckOutlined/>}
                            type="primary"
                            onClick={handleSave}
                        />
                    </Tooltip>
                    <Tooltip title={<Trans>Cancel</Trans>}>
                        <Button
                            icon={<RollbackOutlined/>}
                            onClick={handleEdit}
                        />
                    </Tooltip>
                </Flex>
            ) : (
                <Tooltip title={<Trans>Edit</Trans>}>
                    <Button
                        icon={<EditOutlined/>}
                        type="primary"
                        onClick={handleEdit}
                    />
                </Tooltip>
            )}
            {deleteModalContext}
            {overwriteModalContext}
            {copyMessageContext}
        </Flex>
    );
};

export default EntryView;
