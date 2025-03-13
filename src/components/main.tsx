import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {i18n} from "@lingui/core";
import {I18nProvider} from "@lingui/react";
import {messages} from "../locales/en/messages";
import App from "./app.tsx";
import AuthGuard from "./auth_guard.tsx";

const root = document.getElementById("root");

i18n.load("en", messages);
i18n.activate("en");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <I18nProvider i18n={i18n}>
                <AuthGuard>
                    <App/>
                </AuthGuard>
            </I18nProvider>
        </StrictMode>,
    );
}
