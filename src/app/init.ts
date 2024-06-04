import MyWorker from './worker.ts?worker';
import url from "./index.js?worker&url";
import {getCookieData} from '@/shared/lib';
import WebApp from '@twa-dev/sdk';

const {accountId} = getCookieData<{ accountId?: string }>()

global.VITE_APP_TYPE = import.meta.env.VITE_APP_TYPE
document.body.setAttribute("data-app", import.meta.env.VITE_APP_TYPE)

//Telegram integration object init
WebApp.ready();

if (accountId) {

    import('./index')
    import('@/app/chat/dist/chat.js')

} else {
    //@ts-ignore
    import('@VAR/app/authentication/{{mode-}}dist/authentication.js')
    import('@/app/chat/dist/chat.js')

    const worker = new MyWorker();

    worker.postMessage({method: 'loadIndexModule', url});

    worker.onmessage = (event) => {

        if (event.data.status.cache) {
            worker.terminate();
        } else {
            console.error('Failed to load index module:', event.data);
        }
    };

}