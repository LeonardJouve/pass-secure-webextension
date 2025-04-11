import React, {useEffect} from "react";
import {Button, Modal, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import useRouter from "../store/router";
import {useDeleteEntry, useGetEntry, useUpdateEntry} from "../store/entries";
import UpsertEntry from "./upsert_entry";
import type {Entry} from "../api/entries";

// TODO: loading
const EditEntry: React.FC = () => {
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const {getParam, pop} = useRouter();
    const entryId = getParam<number>("entryId");
    const {data: entry} = useGetEntry(entryId ?? -1);
    const updateEntry = useUpdateEntry();
    const deleteEntry = useDeleteEntry();

    useEffect(() => {
        if (!entryId) {
            pop();
        }
    }, [entryId]);

    if (!entry) {
        return null;
    }

    const handleUpdate = async (values: Omit<Entry, "id">): Promise<void> => await updateEntry.mutateAsync({
        ...values,
        id: entry.id,
    }).then(pop);


    const handleDelete = (): void => {
        deleteModal.confirm({
            title: <Trans>Delete Entry</Trans>,
            icon: <DeleteOutlined/>,
            content: <Trans>Are you sure you want to <strong>Delete permanently</strong> this Entry</Trans>,
            okText: <Trans>Ok</Trans>,
            cancelText: <Trans>No</Trans>,
            okType: "danger",
            okButtonProps: {type: "primary"},
            onOk: () => deleteEntry.mutate(entry.id),
        });
    };

    return (
        <UpsertEntry
            entry={entry}
            actions={(
                <>
                    <Tooltip title={<Trans>Delete</Trans>}>
                        <Button
                            danger={true}
                            type="primary"
                            icon={<DeleteOutlined/>}
                            onClick={handleDelete}
                        />
                    </Tooltip>
                    {deleteModalContext}
                </>
            )}
            onFinish={handleUpdate}
        />
    );
};

export default EditEntry;
