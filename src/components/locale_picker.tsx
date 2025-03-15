import React from "react";
import {Button, Dropdown, type DropdownProps, type MenuProps} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import useIntl, {type Locale} from "../store/intl";
import En from "../icons/en";
import Fr from "../icons/fr";

type Props = DropdownProps;

const getLocaleFlag = (locale: Locale): React.ReactNode => {
    const props = {
        width: 30,
        height: 30,
    };

    switch (locale) {
    case "en":
        return <En {...props}/>;
    case "fr":
        return <Fr {...props}/>;
    default:
        return <GlobalOutlined {...props}/>;
    }
};

const LocalePicker: React.FC<Props> = ({placement = "bottomRight"}) => {
    const {locale, defaultLocale, setLocale, getLocales, getLocaleName} = useIntl();

    const menu: MenuProps = {
        items: Object.entries(getLocales()).map(([localeKey, localeName], i) => ({
            key: i,
            icon: getLocaleFlag(localeKey as Locale),
            label: localeName,
            disabled: localeKey === locale,
            onClick: () => setLocale(localeKey as Locale),
        })),
    };

    return (
        <Dropdown menu={menu} placement={placement}>
            <Button icon={getLocaleFlag(locale ?? defaultLocale)}>
                {getLocaleName(locale ?? defaultLocale)}
            </Button>
        </Dropdown>
    );
};

export default LocalePicker;
