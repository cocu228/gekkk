// import WebApp from '@twa-dev/sdk';
import { getCookieData } from "@/shared/lib";

const { accountId } = getCookieData<{ accountId?: string }>();

global.VITE_APP_TYPE = import.meta.env.VITE_APP_TYPE;
document.body.setAttribute("data-app", import.meta.env.VITE_APP_TYPE);

//Telegram integration object init
// WebApp.ready();

if (accountId) {
  import("./index");
} else {
  //@ts-ignore
  // eslint-disable-next-line import/extensions
  import("@VAR/app/authentication/{{mode-}}dist/authentication.js");
}
// eslint-disable-next-line import/extensions
import("@/app/chat/dist/chat.js");
