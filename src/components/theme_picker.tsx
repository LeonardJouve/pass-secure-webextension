import React from "react";
import {Button} from "antd";
import {MoonOutlined, SunOutlined} from "@ant-design/icons";
import useTheme from "../store/theme";

const ThemePicker: React.FC = () => {
    const {name, toggleTheme} = useTheme();

    return (
        <Button
            icon={name === "dark" ? <MoonOutlined/> : <SunOutlined/>}
            onClick={toggleTheme}
        />
    );
};

export default ThemePicker;
