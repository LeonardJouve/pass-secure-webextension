import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {Flex, Form, Input, Tooltip, Button, Select} from "antd";
import {RollbackOutlined, CheckOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter, {Route} from "../store/router";
import useFolders, { getFolderSelector } from "../store/folders";
import useUsers from "../store/users";
import RouterBack from "./router_back";
import type {Folder} from "../api/folders";

const UpsertFolder: React.FC = () => {
    const {t} = useLingui();
    const {current, pop, replace} = useRouter();
    const {folders, getFolders, createFolder, getFolder, updateFolder} = useFolders();
    const {me, users, getUsers} = useUsers();
    const parentId = Number(current.params["parentId"]);
    const folderId = Number(current.params["folderId"]);
    const folder = useFolders(useShallow(getFolderSelector(folderId)));

    useEffect(() => {
        if (!parentId && !folderId) {
            pop();
        }
    }, [current]);

    useEffect(() => {
        if (!folder && folderId) {
            getFolder(folderId);
        }
    }, [folder, current]);

    useEffect(() => {
        if (!folders) {
            getFolders();
        }
    }, [folders]);

    useEffect(() => {
        if (!users) {
            getUsers();
        }
    }, [users]);

    const handleSave = async (values: Omit<Folder, "id"|"ownerId">): Promise<void> => {
        const response = folder ? await updateFolder({
            ...values,
            id: folder.id,
        }) : await createFolder(values);
        if (!response.error) {
            replace(Route.MAIN);
        }
    };

    const handleCancel = (): void => pop();

    const parentOptions = folders.map((folder) => ({
        label: folder.parentId === null ? t({message: "<default>"}) : folder.name,
        value: folder.id,
    }));

    const userOptions = users
        .filter(({id}) => id !== me?.id)
        .map(({email, id}) => ({
            label: email,
            value: id,
        }));

    return (
        <Flex vertical={true}>
            <RouterBack/>
            <Form
                name="createFolder"
                onFinish={handleSave}
                initialValues={{
                    name: folder?.name,
                    parent: folder?.parentId ?? parentId,
                    users: folder?.userIds.filter((userId) => userId !== me?.id) ?? [],
                }}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: t({message: "Input folder Name"})}]}
                >
                    <Input placeholder={t({message: "Name"})}/>
                </Form.Item>
                <Form.Item
                    name="parent"
                    rules={[{required: true, message: t({message: "Select folder Parent"})}]}
                >
                    <Select options={parentOptions}/>
                </Form.Item>
                <Form.Item name="users">
                    <Select
                        mode="multiple"
                        optionFilterProp="label"
                        options={userOptions}
                        placeholder={t({message: "Select Users to share with"})}
                    />
                </Form.Item>
                <Flex justify="right" gap="small">
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
        </Flex>
    );
};

export default UpsertFolder;
