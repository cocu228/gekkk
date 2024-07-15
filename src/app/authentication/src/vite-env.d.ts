/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}
