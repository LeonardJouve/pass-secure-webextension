import React from "react";
import {Avatar, Button} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const LoadingAvatar: React.FC = () => (
    <Button shape="circle" type="text">
        <Avatar>
            <LoadingOutlined/>
        </Avatar>
    </Button>
);

export default LoadingAvatar;
