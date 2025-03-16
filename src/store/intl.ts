import {create} from "zustand";

const locales = {
    "en": "English",
    "fr": "Français",
} as const;

type Locales = typeof locales;

export type Locale = keyof typeof locales;

type IntlStore = {
    locale: Locale|null;
    defaultLocale: Locale;
    setLocale: (locale: Locale) => void;
    getLocales: () => Locales;
};

const getLocale = (): Locale|null => {
    const locale = localStorage.getItem("locale") as Locale;
    if (locale in locales) {
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
    getLocales: (): Locales => locales,
}));

export default useIntl;
