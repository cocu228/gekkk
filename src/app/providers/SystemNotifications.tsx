import { CtxRootData } from "@/processes/RootContext";
import { useContext, useEffect } from "react";

interface IParams {
    children?: JSX.Element;
}

const SystemNotifications = ({children}: IParams) => {
    let esLink = null;
    let activeNotify = null;
    const {setRefresh} = useContext(CtxRootData);

    function displaySystemNotification(notify) {        
        if (Notification?.permission === "granted") {
            let img = "https://web.gekkard.com/img/favicon/icon.svg";
            let text = "You have a new crypto transactions. ";
            let title = "Incoming crypto funds";
            let obj = notify?.obj;
            if (obj) switch (notify?.mess_type) {
                case 2:
                    text = `+${obj.amount} ${obj.currency}`;
                    title = `Incoming ${obj.currency}`;
                    break;
                case 3:
                    text = `Summ: +${obj.summ} ${obj.currency}, count: ${obj.count}`;
                    title = `Incoming ${obj.currency}`;
                case 4:
                    text += `Transact count: ${obj.count} `;
                    break;
                default:
                    console.log(`Do not support type ${JSON.stringify(notify)}.`);
                    return;
            }
            
            // Notification.requestPermission(function(result) {
            //     if (result === 'granted') {
            //         navigator.serviceWorker.ready.then(function(registration) {
            //             registration.showNotification('ServiceWorker: new transaction', {
            //                 body: text, icon: img, tag: "gekkardTx"
            //             });
            //         });
            //     }
            // });

            activeNotify = new Notification(title, { body: text, icon: img, tag: "gekkardTx" });

            // activeNotify.onclick = function () {
            //     window.open("https://web.gekkard.com/wallet?currency=");
            // };
        }
    }
    function connectES() {
        esLink = new EventSource(import.meta.env.VITE_API_URL + "notify/v1/Subscribe", { withCredentials: true });
        esLink.onmessage = ev => handleReceivedMessage(ev.data);
        esLink.onerror = ev => {
            console.error(ev);
        };
    }
    function closeES() {
        esLink?.close();
    }
    function requestPerm() {
        Notification.requestPermission();
    }
    function handleReceivedMessage(message) {
        if (typeof message !== "string") {
            console.log(message);
            return;
        }
        try {
            const jsonValue = JSON.parse(message);

            console.log(jsonValue);

            //if (!document.hasFocus())
            displaySystemNotification(jsonValue);
            setRefresh();

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        connectES();
    }, []);

    return <div>
        {/* <div className="w-full grid grid-rows-3 gap-2">
            <button onClick={() => {
                displaySystemNotification({
                    mess_type: 2,
                    obj: {
                        currency: 'TEST',
                        amount: 10
                    }
                });
            }}>Test notification</button>
            <button onClick={() => {
                navigator.serviceWorker.register('./sw.js');
            }}>Register sw</button>
            <button onClick={() => {
                Notification.requestPermission(function(result) {
                    if (result === 'granted') {
                        navigator.serviceWorker.ready.then(function(registration) {
                        registration.showNotification('Notification with ServiceWorker');
                        });
                    }
                });
            }}>Test sw notification</button>
        </div> */}

        {children}
    </div>;
}

export default SystemNotifications;
