import React from "react";
import {Button, Tooltip} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import useRouter from "../store/router";
import {Trans} from "@lingui/react/macro";

const RouterBack: React.FC = () => {
    const {pop} = useRouter();

    return (
        <Tooltip title={<Trans>Go Back</Trans>}>
            <Button
                icon={<LeftOutlined/>}
                type="text"
                onClick={pop}
            />
        </Tooltip>
    );
};

export default RouterBack;
