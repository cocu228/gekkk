/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly GEKKOIN_REACT_AUTH_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
