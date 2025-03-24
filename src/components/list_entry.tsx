import React, {useEffect, useState} from "react";
import browser from "webextension-polyfill";
import {Button, Dropdown, List, message, Tooltip} from "antd";
import {CopyOutlined, EditOutlined, GlobalOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import type {Entry} from "../api/entries";
import useRouter, {Route} from "../store/router";

type Props = {
    entry: Entry;
}

const getActiveTabURL = async (): Promise<string|null> => {
    const tabs = await browser.tabs.query({active: true});
    return tabs[0]?.url ?? null;
};

const ListEntry: React.FC<Props> = ({entry}) => {
    const {push} = useRouter();
    const [copyMessage, copyMessageContext] = message.useMessage();
    const [isCurrentTabEntry, setIsCurrentTabEntry] = useState<boolean>(false);

    useEffect(() => {
        getActiveTabURL().then((active) => setIsCurrentTabEntry(active !== null && active === entry.url), () => setIsCurrentTabEntry(false));
    }, [entry]);

    const handleFill = (): void => console.log("TODO");

    const handleOpen = (): void => {
        if (!entry.url) {
            return;
        }

        browser.tabs.create({url: entry.url});
    };

    const handleEdit = (): void => push(Route.EDIT_ENTRY, {entryId: entry.id});

    const handleCopyUsername = (): void => {
        navigator.clipboard.writeText(entry.username);
        copyMessage.info(<Trans>Username copied !</Trans>);
    };

    const handleCopyPassword = (): void => {
        navigator.clipboard.writeText(entry.password);
        copyMessage.info(<Trans>Password copied !</Trans>);
    };

    const actions = [(
        <Tooltip title={<Trans>Edit</Trans>}>
            <Button
                type="primary"
                icon={<EditOutlined/>}
                onClick={handleEdit}
            />
        </Tooltip>
    ), (
        <Dropdown menu={{items: [
            {
                key: 1,
                label: <Trans>Copy Username</Trans>,
                onClick: handleCopyUsername,
            },
            {
                key: 2,
                label: <Trans>Copy Password</Trans>,
                onClick: handleCopyPassword,
            },
        ]}}>
            <Button
                type="dashed"
                icon={<CopyOutlined/>}
            />
        </Dropdown>
    )];

    if (entry.url) {
        actions.push((
            <Tooltip title={<Trans>Open in another tab</Trans>}>
                <Button
                    icon={<GlobalOutlined/>}
                    type="text"
                    onClick={handleOpen}
                />
            </Tooltip>
        ));
    }

    if (isCurrentTabEntry) {
        actions.push((
            <Button
                type="primary"
                onClick={handleFill}
            >
                <Trans>Fill</Trans>
            </Button>
        ));
    }

    return (
        <List.Item
            title={entry.name}
            actions={actions.reverse()}
        >
            <List.Item.Meta title={entry.name}/>
            {copyMessageContext}
        </List.Item>
    );
};

export default ListEntry;
