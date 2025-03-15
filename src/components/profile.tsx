import React, {useEffect} from "react";
import {Avatar, Dropdown, Modal, type DropdownProps, type MenuProps} from "antd";
import {LoadingOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import useUsers from "../store/users";
import useAuth from "../store/auth";
import useRouter, {Route} from "../store/router";

type Props = DropdownProps;

const Profile: React.FC<Props> = ({placement = "bottomRight", ...props}) => {
    const {push} = useRouter();
    const [disconnectModal, disconnectModalContext] = Modal.useModal();
    const {me, getMe} = useUsers();
    const {disconnect} = useAuth();

    useEffect(() => {
        if (!me) {
            getMe();
        }
    }, [me]);

    if (!me) {
        return (
            <Avatar>
                <LoadingOutlined/>
            </Avatar>
        );
    }

    const menu: MenuProps = {items: [
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
    ]};

    return (
        <>
            <Dropdown menu={menu} placement={placement} {...props}>
                <Avatar>
                    {me.username[0]?.toUpperCase()}
                </Avatar>
            </Dropdown>
            {disconnectModalContext}
        </>
    );
};

export default Profile;
