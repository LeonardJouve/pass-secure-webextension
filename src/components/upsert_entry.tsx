import React, {useEffect, useState} from "react";
import {Button, Flex, Form, Input, Select, Tooltip} from "antd";
import {CheckOutlined, RollbackOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter from "../store/router";
import useFolders from "../store/folders";
import type {Entry} from "../api/entries";
import RouterBack from "./router_back";
import PasswordGenerator from "./password_generator";

type Props = {
    entry: Partial<Entry>;
    onFinish: (values: Omit<Entry, "id">) => void;
    actions?: React.ReactNode;
};

const UpsertEntry: React.FC<Props> = ({entry, onFinish, actions = null}) => {
    const {t} = useLingui();
    const {pop} = useRouter();
    const {folders, getFolders} = useFolders();
    const [password, setPassword] = useState<string>(entry?.password ?? "");

    useEffect(() => {
        if (!folders) {
            getFolders();
        }
    }, [folders]);

    const folderOptions = folders.map(({id, name, parentId}) => ({
        label: parentId === null ? t({message: "<default>"}) : name,
        value: id,
    }));

    return (
        <Flex vertical={true}>
            <RouterBack/>
            <Form
                name="upsertEntry"
                onFinish={onFinish}
                initialValues={entry}
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
                    name="folderId"
                    rules={[{required: true, message: t({message: "Select entry Folder"})}]}
                >
                    <Select options={folderOptions}/>
                </Form.Item>
                <Flex justify="right" gap="small">
                    {actions}
                    <Tooltip title={<Trans>Cancel</Trans>}>
                        <Button
                            icon={<RollbackOutlined/>}
                            onClick={pop}
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

export default UpsertEntry;
