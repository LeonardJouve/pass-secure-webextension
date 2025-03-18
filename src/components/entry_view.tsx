import React, {useEffect, useState} from "react";
import useRouter from "../store/router";
import RouterBack from "./router_back";
import {Button, Flex, Modal, Tooltip} from "antd";
import {Trans} from "@lingui/react/macro";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import useEntries from "../store/entries";
import PasswordGenerator from "./password_generator";

const EntryView: React.FC = () => {
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const {current, pop} = useRouter();
    const {deleteEntry} = useEntries();
    const [isEditing, setIsEditing] = useState<boolean>(Boolean(current.params["isEditing"]));
    const entryId = Number(current.params["entryId"]);

    useEffect(() => {
        if (!entryId) {
            pop();
        }
    }, [current]);

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

    const handleEdit = (): void => setIsEditing(!isEditing);

    return (
        <Flex vertical={true}>
            <RouterBack/>
            <Tooltip title={<Trans>Delete</Trans>}>
                <Button
                    danger={true}
                    icon={<DeleteOutlined/>}
                    type="primary"
                    onClick={handleDelete}
                />
            </Tooltip>
            <Tooltip title={<Trans>Edit</Trans>}>
                <Button
                    icon={<EditOutlined/>}
                    type="primary"
                    onClick={handleEdit}
                />
            </Tooltip>
            <PasswordGenerator/>
            {deleteModalContext}
        </Flex>
    );
};

export default EntryView;
