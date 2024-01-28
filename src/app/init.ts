import {getCookieData} from "@/shared/lib/helpers";
// import {apiGetInfo} from "@/shared/(orval)api/gek";
import MyWorker from './worker.ts?worker'
import url from "./index.js?worker&url"

const {accountId} = getCookieData<{ accountId?: string }>()

console.log("accountId")
console.log(accountId)

if (accountId) {
    import('./index')
} else {

    import('@/app/authentication/dist/authentication.js')

    const worker = new MyWorker()

    worker.addEventListener('message', function (e) {
        alert(`Worker said: ', ${e.data}`);
    }, false);

    worker.postMessage({method: 'loadIndexModule', url});

    worker.onmessage = (event) => {
        if (event.data === 'indexModuleLoaded') {
            worker.terminate();
        } else {
            console.error('Failed to load index module:', event.data);
        }
    };

}