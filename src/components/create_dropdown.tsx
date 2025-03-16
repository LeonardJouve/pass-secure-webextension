import React from "react";
import type {Folder} from "../api/folders";
import {Button, Dropdown} from "antd";
import {Trans} from "@lingui/react/macro";
import {FileAddOutlined, FolderAddOutlined, PlusOutlined} from "@ant-design/icons";
import useRouter, {Route} from "../store/router";

type Props = {
    folderId: Folder["id"];
}

const CreateDropdown: React.FC<Props> = ({folderId}) => {
    const {push} = useRouter();

    return (
        <Dropdown menu={{items: [
            {
                key: 1,
                label: <Trans>Create Folder</Trans>,
                icon: <FolderAddOutlined/>,
                onClick: (): void => push(Route.CREATE_FOLDER, {parentId: folderId}),
            },
            {
                key: 2,
                icon: <FileAddOutlined/>,
                label: <Trans>Create Entry</Trans>,
                onClick: (): void => push(Route.CREATE_ENTRY, {folderId}),
            },
        ]}}>
            <Button
                shape="circle"
                type="primary"
                icon={<PlusOutlined/>}
                onClick={(e) => e.stopPropagation()}
            />
        </Dropdown>
    );
};

export default CreateDropdown;
