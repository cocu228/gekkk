// import WebApp from '@twa-dev/sdk';
import { getCookieData, setCookieData } from "@/shared/lib";

const { accountId } = getCookieData<{ accountId?: string }>();

global.VITE_APP_TYPE = import.meta.env.VITE_APP_TYPE;
document.body.setAttribute("data-app", import.meta.env.VITE_APP_TYPE);

//Telegram integration object init
// WebApp.ready();

if (accountId) {
  import("./index");
  // eslint-disable-next-line import/extensions
  import("@/app/chat/dist/chat.js");
} else {
  //@ts-ignore
  // eslint-disable-next-line import/extensions
  import("@VAR/app/authentication/{{mode-}}dist/authentication.js");
  // eslint-disable-next-line import/extensions
  import("@/app/chat/dist/chat.js");
}

function reload() {
  setCookieData([{
    key: 'lastReload',
    value: new Date().toISOString(),
    expiration: new Date().setTime(new Date().getTime() + (30 * 24 * 60 * 60 * 1000))
  }]);
  window.location.reload();
}

// Функция для проверки и обновления куки
function checkAndUpdateCookie() {
  const currentDate = new Date();
  const {lastReload} = getCookieData<{lastReload? :string}>();
  
  if (lastReload) {
    const lastReloadDate = new Date(lastReload);
    const diffTime = Math.abs(currentDate.getTime() - lastReloadDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 7 days from previous reload
    if (diffDays >= 7) {
      reload();
    }
  } else {
    reload();
  }
}

// Таймер, который проверяет куку через 3 секунды
setTimeout(checkAndUpdateCookie, 3000);
