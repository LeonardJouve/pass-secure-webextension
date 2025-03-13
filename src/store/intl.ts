import {create} from "zustand";

const locales = ["en", "fr"] as const;

export type Locale = typeof locales[number];

type IntlStore = {
    locale: Locale|null;
    defaultLocale: Locale;
    setLocale: (locale: Locale) => void;
};

const getLocale = (): Locale|null => {
    const locale = localStorage.getItem("locale") as Locale;
    if (locales.includes(locale)) {
        return locale;
    }

    return null;
};

const useIntl = create<IntlStore>((set) => ({
    locale: getLocale(),
    defaultLocale: "en",
    setLocale: (locale): void => {
        localStorage.setItem("locale", locale);
        set({locale});
    },
}));

export default useIntl;
