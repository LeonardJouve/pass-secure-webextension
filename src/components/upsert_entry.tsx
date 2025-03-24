import React, {useEffect, useState} from "react";
import {Button, Flex, Form, Input, Modal, Select, Tooltip} from "antd";
import {CheckOutlined, DeleteOutlined, RollbackOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter, {Route} from "../store/router";
import useFolders from "../store/folders";
import useEntries from "../store/entries";
import type {Entry} from "../api/entries";
import RouterBack from "./router_back";
import PasswordGenerator from "./password_generator";

type Props = {
    folderId: number;
    entry?: never;
} | {
    entry: Entry;
    folderId?: never;
};

const UpsertEntry: React.FC<Props> = ({folderId, entry}) => {
    const {t} = useLingui();
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const {pop} = useRouter();
    const {folders, getFolders} = useFolders();
    const {createEntry, updateEntry, deleteEntry} = useEntries();
    const [password, setPassword] = useState<string>(entry?.password ?? "");

    useEffect(() => {
        if (!folders) {
            getFolders();
        }
    }, [folders]);

    const handleSave = async (values: Omit<Entry, "id">): Promise<void> => {
        const response = entry ? await updateEntry({
            ...values,
            id: entry.id
        }) : await createEntry(values);

        if (!response.error) {
            pop();
        }
    };

    const handleCancel = (): void => pop();

    const handleDelete = (): void => {
        if (!entry) {
            return;
        }

        deleteModal.confirm({
            title: <Trans>Delete Entry</Trans>,
            icon: <DeleteOutlined/>,
            content: <Trans>Are you sure you want to <strong>Delete permanently</strong> this Entry</Trans>,
            okText: <Trans>Ok</Trans>,
            cancelText: <Trans>No</Trans>,
            okType: "danger",
            okButtonProps: {type: "primary"},
            onOk: () => {
                deleteEntry(entry.id);
            },
        });
    };

    const folderOptions = folders.map(({id, name, parentId}) => ({
        label: parentId === null ? t({message: "<default>"}) : name,
        value: id,
    }));

    return (
        <Flex vertical={true}>
            <RouterBack/>
            <Form
                name="upsertEntry"
                onFinish={handleSave}
                initialValues={{
                    name: entry?.name,
                    username: entry?.username,
                    password: entry?.password,
                    url: entry?.url,
                    folder: entry?.folderId ?? folderId,
                }}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: t({message: "Input entry Name"})}]}
                >
                    <Input placeholder={t({message: "Name"})}/>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: t({message: "Input entry Username"})}]}
                >
                    <Input placeholder={t({message: "Username"})}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: t({message: "Input entry Password"})}]}
                    valuePropName="password"
                    trigger="setPassword"
                    validateTrigger="setPassword"
                >
                    <PasswordGenerator
                        password={password}
                        setPassword={setPassword}
                    />
                </Form.Item>
                <Form.Item name="url">
                    <Input
                        type="url"
                        placeholder={t({message: "URL"})}
                    />
                </Form.Item>
                <Form.Item
                    name="folder"
                    rules={[{required: true, message: t({message: "Select entry Folder"})}]}
                >
                    <Select options={folderOptions}/>
                </Form.Item>
                <Flex justify="right" gap="small">
                    {entry ? (
                        <Tooltip title={<Trans>Delete</Trans>}>
                            <Button
                                danger={true}
                                type="primary"
                                icon={<DeleteOutlined/>}
                                onClick={handleDelete}
                            />
                        </Tooltip>
                    ) : null}
                    <Tooltip title={<Trans>Cancel</Trans>}>
                        <Button
                            icon={<RollbackOutlined/>}
                            onClick={handleCancel}
                        />
                    </Tooltip>
                    <Tooltip title={<Trans>Save</Trans>}>
                        <Button
                            icon={<CheckOutlined/>}
                            type="primary"
                            htmlType="submit"
                        />
                    </Tooltip>
                </Flex>
            </Form>
            {deleteModalContext}
        </Flex>
    );
};

export default UpsertEntry;
