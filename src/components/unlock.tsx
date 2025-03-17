import React from "react";
import {Button, Flex, Tooltip} from "antd";
import {DisconnectOutlined, LockOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import useAuth from "../store/auth";

const Unlock: React.FC = () => {
    const {disconnect, unlock} = useAuth();

    return (
        <Flex>
            <Tooltip title={<Trans>Disconnect</Trans>}>
                <Button
                    icon={<LockOutlined/>}
                    type="primary"
                    onClick={unlock}
                />
                <Button
                    icon={<DisconnectOutlined/>}
                    type="primary"
                    danger={true}
                    onClick={disconnect}
                />
            </Tooltip>

        </Flex>
    );
};

export default Unlock;

