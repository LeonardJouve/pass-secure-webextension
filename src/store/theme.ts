import {create} from "zustand";
import {theme, type ThemeConfig} from "antd";

const themes = [
    "light",
    "dark",
] as const;

type Theme = (typeof themes)[number];

type ThemeStore = {
    name: Theme;
    getTheme: () => ThemeConfig;
    toggleTheme: () => void;
};

const getTheme = (): Theme => {
    const name = localStorage.getItem("theme") as Theme;
    if (name in themes) {
        return name;
    }

    return "light";
};

const useTheme = create<ThemeStore>((set, get) => ({
    name: getTheme(),
    getTheme: (): ThemeConfig => ({
        components: {
            List: {
                itemPadding: "12px 16px",
            },
        },
        algorithm: get().name === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }),
    toggleTheme: (): void => {
        const name = get().name === "dark" ? "light" : "dark";
        localStorage.setItem("theme", name);
        set({name});
    },
}));

export default useTheme;
