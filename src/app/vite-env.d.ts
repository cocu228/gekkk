/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}

interface ImportMetaEnv {
  readonly VITE_APP_TYPE: string;
  readonly VITE_API_URL: string;
  readonly VITE_BANK_API_URL: string;
  readonly VITE_APP_STORE_GEKKARD: string;
  readonly VITE_GOOGLE_PLAY_GEKKARD: string;
  readonly VITE_GEKKOIN_URL: string;
  readonly VITE_GEKKARD_URL: string;
  readonly VITE_REGISTRATION_URL: string;
  readonly VITE_SUPPORT_WS_URL: string;
  readonly VITE_SUPPORT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
