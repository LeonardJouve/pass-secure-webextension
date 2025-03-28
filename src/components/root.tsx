import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import ThemeProvider from "./theme_provider.tsx";
import IntlProvider from "./intl_provider.tsx";
import Router from "./router.tsx";

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <ThemeProvider>
                <IntlProvider>
                    <Router/>
                </IntlProvider>
            </ThemeProvider>
        </StrictMode>,
    );
}
