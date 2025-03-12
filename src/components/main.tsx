import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./app.tsx";
import AuthGuard from "./auth_guard.tsx";

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <AuthGuard>
                <App/>
            </AuthGuard>
        </StrictMode>,
    );
}
