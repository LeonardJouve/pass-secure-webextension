import React from "react";
import {Button, Flex, Tooltip} from "antd";
import {DisconnectOutlined, LockOutlined} from "@ant-design/icons";
import {Trans} from "@lingui/react/macro";
import useAuth from "../store/auth";

const Unlock: React.FC = () => {
    const {disconnect, connect} = useAuth();

    return (
        <Flex>
            <Tooltip title={<Trans>Disconnect</Trans>}>
                <Button
                    icon={<LockOutlined/>}
                    type="primary"
                    onClick={connect}
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

