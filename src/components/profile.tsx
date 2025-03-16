import React from "react";
import {Dropdown, Modal, type MenuProps} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import useUsers from "../store/users";
import useAuth from "../store/auth";
import useRouter, {Route} from "../store/router";
import UserAvatar from "./user_avatar";

const Profile: React.FC = () => {
    const {push} = useRouter();
    const [disconnectModal, disconnectModalContext] = Modal.useModal();
    const {me} = useUsers();
    const {disconnect} = useAuth();

    const menu: MenuProps = {items: me ? [
        {
            key: 0,
            icon: <UserOutlined/>,
            label: me.username,
            onClick: () => push(Route.EDIT_PROFILE),
        },
        {
            key: 1,
            danger: true,
            icon: <LogoutOutlined/>,
            label: <Trans>Disconnect</Trans>,
            onClick: () => disconnectModal.confirm({
                title: <Trans>Disconnect</Trans>,
                icon: <LogoutOutlined/>,
                content: <Trans>Are you sure you want to <strong>Disconnect</strong></Trans>,
                okText: <Trans>Ok</Trans>,
                okType: "danger",
                cancelText: <Trans>No</Trans>,
                onOk: disconnect,
            }),
        },
    ] : []};

    return (
        <>
            <Dropdown menu={menu} placement="bottomRight">
                <UserAvatar
                    userId="me"
                    showTooltip={false}
                />
            </Dropdown>
            {disconnectModalContext}
        </>
    );
};

export default Profile;
