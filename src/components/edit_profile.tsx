import React from "react";
import {Button, Flex, Form, Input, Modal, Tooltip} from "antd";
import {CheckOutlined, DeleteOutlined, LockOutlined, RollbackOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useRouter from "../store/router";
import LocalePicker from "./locale_picker";
import RouterBack from "./router_back";
import LongPress from "./long_press";
import type {UpdateMeInput} from "../api/users";
import {useDeleteMe, useGetUser, useUpdateMe} from "../store/users";

// TODO: loading
const EditProfile: React.FC = () => {
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const {t} = useLingui();
    const {pop} = useRouter();
    const {data: me} = useGetUser("me");
    const updateMe = useUpdateMe();
    const deleteMe = useDeleteMe();

    const handleCancel = pop;

    const handleSave = async (values: UpdateMeInput): Promise<void> => await updateMe.mutateAsync(values).then(pop);

    const handleDelete = (): void => {
        const modal = deleteModal.confirm({
            title: <Trans>Delete Account</Trans>,
            icon: <DeleteOutlined/>,
            content: <Trans>Are you sure you want to <strong>Delete permanently</strong> this Account ?</Trans>,
            cancelText: <Trans>No</Trans>,
        });

        modal.update({
            footer: (_, {CancelBtn}) => (
                <Flex
                    align="end"
                    gap="small"
                >
                    <CancelBtn/>
                    <LongPress
                        type="primary"
                        danger={true}
                        delay={5_000}
                        onLongPress={() => {
                            deleteMe.mutate();
                            modal.destroy();
                        }}
                    >
                        <Trans>Ok</Trans>
                    </LongPress>
                </Flex>
            ),
        });
    };

    if (!me) {
        return;
    }

    return (
        <Flex
            vertical={true}
            gap="small"
        >
            <Flex justify="space-between">
                <RouterBack/>
                <LocalePicker/>
            </Flex>
            <Form
                name="editProfile"
                onFinish={handleSave}
                initialValues={me}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: t({message: "Input account Email"})}]}
                >
                    <Input
                        placeholder={t({message: "Email"})}
                        type="email"
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[{required: true, message: t({message: "Input account Username"})}]}
                >
                    <Input placeholder={t({message: "Username"})}/>
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder={t({message: "New Password"})}
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
                    <Tooltip title={<Trans>Delete Account</Trans>}>
                        <Button
                            danger={true}
                            type="primary"
                            icon={<DeleteOutlined/>}
                            onClick={handleDelete}
                        />
                    </Tooltip>
                </Flex>
            </Form>
            {deleteModalContext}
        </Flex>
    );
};

export default EditProfile;
