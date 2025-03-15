import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import IntlProvider from "./intl_provider.tsx";
import Router from "./router.tsx";

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <IntlProvider>
                <Router/>
            </IntlProvider>
        </StrictMode>,
    );
}
