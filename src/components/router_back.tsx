import React from "react";
import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import useRouter from "../store/router";

const RouterBack: React.FC = () => {
    const {pop} = useRouter();

    return <Button icon={<LeftOutlined/>} onClick={pop}/>;
};

export default RouterBack;
