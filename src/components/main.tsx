import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./app.tsx";
import AuthGuard from "./auth/auth_guard.tsx";
import IntlProvider from "./intl_provider.tsx";

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <IntlProvider>
                <AuthGuard>
                    <App/>
                </AuthGuard>
            </IntlProvider>
        </StrictMode>,
    );
}
