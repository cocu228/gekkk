import MyWorker from './worker.ts?worker';
import url from "./index.js?worker&url";
import {getCookieData} from '@/shared/lib';
const {accountId} = getCookieData<{ accountId?: string }>()

if (accountId) {
    import('./index')
} else {
    import('@/app/authentication/dist/authentication.js')
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