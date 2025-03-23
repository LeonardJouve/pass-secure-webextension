import React, {useEffect} from "react";
import {Flex, Form, Input, Tooltip, Button, Select} from "antd";
import {RollbackOutlined, CheckOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter, {Route} from "../store/router";
import useUsers from "../store/users";
import useFolders from "../store/folders";
import RouterBack from "./router_back";
import type {Folder} from "../api/folders";

type Props = {
    parentId: Number;
    folder?: never;
} | {
    folder: Folder;
    parentId?: never;
}

const UpsertFolder: React.FC<Props> = ({parentId, folder}) => {
    const {t} = useLingui();
    const {pop, replace} = useRouter();
    const {folders, getFolders, createFolder, updateFolder} = useFolders();
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
                name="upsertFolder"
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
