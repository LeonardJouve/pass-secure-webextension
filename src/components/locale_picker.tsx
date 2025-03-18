import React from "react";
import {Button, Dropdown, type MenuProps} from "antd";
import useIntl, {type Locale} from "../store/intl";
import En from "../icons/en";
import Fr from "../icons/fr";

const getLocaleFlag = (locale: Locale): React.ReactNode => {
    const props = {
        width: 20,
        height: 20,
    };

    switch (locale) {
    case "en":
        return <En {...props}/>;
    case "fr":
        return <Fr {...props}/>;
    }
};

const LocalePicker: React.FC = () => {
    const {locale, defaultLocale, setLocale, getLocales} = useIntl();

    const menu: MenuProps = {
        items: Object.entries(getLocales()).map(([localeKey, localeName], i) => ({
            key: i,
            icon: getLocaleFlag(localeKey as Locale),
            label: localeName,
            disabled: localeKey === (locale ?? defaultLocale),
            onClick: () => setLocale(localeKey as Locale),
        })),
    };

    const currentLocale = locale ?? defaultLocale;

    return (
        <Dropdown menu={menu}>
            <Button icon={getLocaleFlag(currentLocale)}/>
        </Dropdown>
    );
};

export default LocalePicker;
