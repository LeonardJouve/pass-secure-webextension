import React, {useEffect, useState} from "react";
import {Collapse, Divider, Input, type CollapseProps} from "antd";
import {FolderOpenOutlined} from "@ant-design/icons";
import {Trans, useLingui} from "@lingui/react/macro";
import useFolders from "../store/folders";
import Profile from "./profile";

const App: React.FC = () => {
    const {t} = useLingui();
    const {folders, getFolders} = useFolders();
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        if (!folders.length) {
            getFolders();
        }
    }, [folders]);

    const handleSearch = async (search: string): Promise<void> => {
        setIsSearching(true);
        await getFolders({search});
        setIsSearching(false);
    };

    const items: CollapseProps["items"] = folders.map((folder, i) => ({
        key: i,
        label: folder.name,
        children: (
            <>
                <span>1</span>
                <span>2</span>
                <span>3</span>
            </>
        ),
    }));

    return (
        <div>
            <Input.Search
                placeholder={t({message: "Search"})}
                loading={isSearching}
                allowClear={true}
                onSearch={handleSearch}
            />
            <Profile/>
            <Divider/>
            {items.length ? <Collapse items={items} accordion={true}/> : (
                <div>
                    <FolderOpenOutlined/>
                    <Trans>No password saved</Trans>
                </div>
            )}
        </div>
    );
};

export default App;
