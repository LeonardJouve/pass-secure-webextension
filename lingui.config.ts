import {defineConfig} from "@lingui/cli";

export default defineConfig({
    sourceLocale: "en",
    locales: ["fr", "en"],
    catalogs: [{
        path: "<rootDir>/src/locales/{locale}/messages",
        include: ["src"],
    }],
    format: "po",
    service: {
        name: "TranslationIO",
        apiKey: process.env["TRANSLATION_IO_API_KEY"]!, // eslint-disable-line @typescript-eslint/no-non-null-assertion, no-undef
    },
});
