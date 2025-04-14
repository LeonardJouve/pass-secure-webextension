import React, {type PropsWithChildren} from "react";
import {ConfigProvider} from "antd";
import useTheme from "../store/theme";

const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
    const {getTheme} = useTheme();

    return (
        <ConfigProvider theme={getTheme()}>
            {children}
        </ConfigProvider>
    );
};

export default ThemeProvider;
