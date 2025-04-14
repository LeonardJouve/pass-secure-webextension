import React from "react";
import {Button, Dropdown, Flex, Modal, Skeleton, theme, type MenuProps} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import useAuth from "../store/auth";
import useRouter, {Route} from "../store/router";
import UserAvatar from "./user_avatar";
import {useGetUser} from "../store/users";

const Profile: React.FC = () => {
    const {push} = useRouter();
    const [disconnectModal, disconnectModalContext] = Modal.useModal();
    const {token} = theme.useToken();
    const {isLoading, data: me} = useGetUser("me");
    const {disconnect} = useAuth();

    const menu: MenuProps = {items: [
        {
            key: 0,
            icon: <UserOutlined/>,
            label: me?.username,
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
                okButtonProps: {type: "primary"},
                cancelText: <Trans>No</Trans>,
                onOk: disconnect,
            }),
        },
    ]};

    const renderLoading = (): React.ReactNode => (
        <Flex
            vertical={true}
            gap="small"
            style={{backgroundColor: token.colorBgElevated}}
        >
            {menu.items?.map(() => <Skeleton.Input active={true}/>) ?? null}
        </Flex>
    );

    return (
        <>
            <Dropdown
                menu={menu}
                placement="bottomRight"
                dropdownRender={isLoading ? renderLoading : undefined}
            >
                <Button shape="circle" type="text">
                    <UserAvatar
                        userId={"me"}
                        showTooltip={false}
                    />
                </Button>
            </Dropdown>
            {disconnectModalContext}
        </>
    );
};

export default Profile;
