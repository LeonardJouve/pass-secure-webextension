import React, {useEffect} from "react";
import {useShallow} from "zustand/react/shallow";
import {Collapse, Empty, List, type CollapseProps} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import type {Folder} from "../api/folders";
import useFolders, {getChildrenFolders} from "../store/folders";
import CreateDropdown from "./create_dropdown";
import useEntries, {getFolderEntries} from "../store/entries";
import type {Entry} from "../api/entries";
import ListEntry from "./list_entry";

type Props = {
    folderId: Folder["id"];
};

const FolderCollapse: React.FC<Props> = ({folderId}) => {
    const childrenFolders = useFolders(useShallow(getChildrenFolders(folderId)));
    const folderEntries = useEntries(useShallow(getFolderEntries(folderId)));
    const {getEntries} = useEntries();

    useEffect(() => {
        if (!folderEntries.length) {
            getEntries();
        }
    }, [folderEntries]);

    const folderItems: CollapseProps["items"] = childrenFolders.map((childFolder, i) => ({
        key: i,
        showArrow: false,
        label: (
            <div>
                <Trans>{childFolder.name}</Trans>
                <CreateDropdown folderId={childFolder.id}/>
            </div>
        ),
        children: <FolderCollapse folderId={childFolder.id}/>,
    }));

    const renderEntry = (entry: Entry, i: number): React.ReactNode => <ListEntry key={i} entry={entry}/>;

    if (!folderItems.length && !folderEntries.length) {
        return (
            <Empty
                image={<FolderOpenOutlined/>}
                description={<Trans>No password saved</Trans>}
            >
                <CreateDropdown folderId={folderId}/>
            </Empty>
        );
    }

    return (
        <div>
            <Collapse
                accordion={true}
                items={folderItems}
            />
            {folderEntries.length ? (
                <List
                    itemLayout="horizontal"
                    dataSource={folderEntries}
                    renderItem={renderEntry}
                />
            ) : null}
        </div>
    );
};

export default FolderCollapse;
