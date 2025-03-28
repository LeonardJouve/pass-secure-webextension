import React, {useEffect} from "react";
import {Button, Modal, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import {useShallow} from "zustand/react/shallow";
import useRouter from "../store/router";
import useEntries, {getEntrySelector} from "../store/entries";
import UpsertEntry from "./upsert_entry";
import type {Entry} from "../api/entries";

const EditEntry: React.FC = () => {
    const [deleteModal, deleteModalContext] = Modal.useModal();
    const {current, pop} = useRouter();
    const entryId = Number(current.params["entryId"]);
    const {getEntry, updateEntry, deleteEntry} = useEntries();
    const entry = useEntries(useShallow(getEntrySelector(entryId)));

    useEffect(() => {
        if (!entryId) {
            pop();
        }
    }, [current]);

    useEffect(() => {
        if (!entry && entryId) {
            getEntry(entryId);
        }
    }, [entry, current]);

    if (!entryId || !entry) {
        return null;
    }

    const handleUpdate = async (values: Omit<Entry, "id">): Promise<void> => {
        const response = await updateEntry({
            ...values,
            id: entry.id,
        });

        if (!response.error) {
            pop();
        }
    };


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
                deleteEntry(entry.id);
            },
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
