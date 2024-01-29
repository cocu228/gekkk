import {getCookieData} from "@/shared/lib/helpers";
// import {apiGetInfo} from "@/shared/(orval)api/gek";
import MyWorker from './worker.ts?worker'
import url from "./index.js?worker&url"

const {accountId} = getCookieData<{ accountId?: string }>()

if (accountId) {
    import('./index')
} else {
    import('@/app/authentication/dist/authentication.js')

    const worker = new MyWorker()

    worker.postMessage({method: 'loadIndexModule', url});

    worker.onmessage = (event) => {

        console.log("event")

        console.log(event.data)

        if (event.data.status.cache) {
            worker.terminate();
        } else {
            console.error('Failed to load index module:', event.data);
        }
    };

}