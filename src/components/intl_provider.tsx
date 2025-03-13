import type React from "react";
import {i18n, type Messages} from "@lingui/core";
import {useEffect, type PropsWithChildren} from "react";
import {I18nProvider} from "@lingui/react";

const defaultLocale = "en";
const locales = [
    "en",
    "fr",
];

const setLocal = async (locale: string): Promise<void> => {
    const {messages} = await import(`../locales/${locale}/messages`) as {messages: Messages};
    i18n.load(locale, messages);
    i18n.activate(locale);
};

const IntlProvider: React.FC<PropsWithChildren> = ({children}) => {
    useEffect(() => {
        setLocal(defaultLocale);
    }, []);

    return (
        <I18nProvider i18n={i18n}>
            {children}
        </I18nProvider>
    );
};

export default IntlProvider;
