import React, {useEffect, useState} from "react";
import {Button, Flex, Form, Input, Select, Tooltip} from "antd";
import {CheckOutlined, RollbackOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter, {Route} from "../store/router";
import useFolders from "../store/folders";
import useEntries from "../store/entries";
import type {Entry} from "../api/entries";
import RouterBack from "./router_back";
import PasswordGenerator from "./password_generator";

const CreateEntry: React.FC = () => {
    const {t} = useLingui();
    const {current, pop, replace} = useRouter();
    const {folders, getFolders} = useFolders();
    const {createEntry} = useEntries();
    const [password, setPassword] = useState<string>("");
    const folderId = Number(current.params["folderId"]);

    useEffect(() => {
        if (!folderId) {
            pop();
        }
    }, [current]);

    useEffect(() => {
        if (!folders) {
            getFolders();
        }
    }, [folders]);

    const handleSave = async (values: Omit<Entry, "id">): Promise<void> => {
        const response = await createEntry(values);
        if (!response.error) {
            replace(Route.ENTRY_VIEW, {entryId: response.data.id, isEditing: false});
        }
    };

    const handleCancel = (): void => pop();

    const folderOptions = folders.map(({id, name, parentId}) => ({
        label: parentId === null ? t({message: "<default>"}) : name,
        value: id,
    }));

    return (
        <Flex vertical={true}>
            <RouterBack/>
            <Form
                name="createEntry"
                onFinish={handleSave}
                initialValues={{folder: folderId}}
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

export default CreateEntry;
