import React, {type PropsWithChildren} from "react";
import {ConfigProvider, type ThemeConfig} from "antd";

const theme: ThemeConfig = {
    components: {
        List: {
            itemPadding: "12px 16px",
        },
    },
};

const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => (
    <ConfigProvider theme={theme}>
        {children}
    </ConfigProvider>
);

export default ThemeProvider;
