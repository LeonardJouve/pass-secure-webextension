import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ThemeProvider from "./theme_provider.tsx";
import IntlProvider from "./intl_provider.tsx";
import Router from "./router.tsx";
import ErrorToast from "./error_toast.tsx";

const root = document.getElementById("root");

const client = new QueryClient();

if (root) {
    createRoot(root).render(
        <StrictMode>
            <QueryClientProvider client={client}>
                <ThemeProvider>
                    <IntlProvider>
                        <ErrorToast>
                            <Router/>
                        </ErrorToast>
                    </IntlProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>,
    );
}
