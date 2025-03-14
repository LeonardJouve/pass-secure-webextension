import type React from "react";
import {i18n, type Messages} from "@lingui/core";
import {useEffect, type PropsWithChildren} from "react";
import {I18nProvider} from "@lingui/react";
import useIntl, {type Locale} from "../store/intl";

const setLocal = async (locale: Locale): Promise<void> => {
    const {messages} = await import(/* @vite-ignore */ `../locales/${locale}/messages`) as {messages: Messages};
    i18n.load(locale, messages);
    i18n.activate(locale);
};

const IntlProvider: React.FC<PropsWithChildren> = ({children}) => {
    const {locale, defaultLocale} = useIntl();

    useEffect(() => {
        setLocal(locale ?? defaultLocale);
    }, [locale, defaultLocale]);

    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    );
};

export default IntlProvider;
