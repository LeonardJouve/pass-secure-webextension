import React, {useEffect} from "react";
import {Flex, Form, Input, Tooltip, Button, Select} from "antd";
import {RollbackOutlined, CheckOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter from "../store/router";
import useUsers from "../store/users";
import useFolders from "../store/folders";
import RouterBack from "./router_back";
import type {Folder} from "../api/folders";

type Props = {
    folder: Partial<Folder>;
    onFinish: (values: Omit<Folder, "id"|"ownerId">) => void;
}

const UpsertFolder: React.FC<Props> = ({folder, onFinish}) => {
    const {t} = useLingui();
    const {pop} = useRouter();
    const {folders, getFolders} = useFolders();
    const {me, users, getUsers} = useUsers();

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

    const handleCancel = (): void => pop();

    const parentOptions = folders.map((f) => ({
        label: f.parentId === null ? t({message: "<default>"}) : f.name,
        value: f.id,
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
                name="upsertFolder"
                onFinish={onFinish}
                initialValues={folder}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: t({message: "Input folder Name"})}]}
                >
                    <Input placeholder={t({message: "Name"})}/>
                </Form.Item>
                <Form.Item
                    name="parentId"
                    rules={[{required: true, message: t({message: "Select folder Parent"})}]}
                >
                    <Select options={parentOptions}/>
                </Form.Item>
                <Form.Item name="userIds">
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
