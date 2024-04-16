import { getCookieData } from "@/shared/lib";
import { useContext, useEffect } from "react";
import { CtxRootData } from "@/processes/RootContext";

interface IParams {
    children?: JSX.Element;
}

const SystemNotifications = ({children}: IParams) => {
    let esLink = null;
    const {setRefresh} = useContext(CtxRootData);
    const {notificationsEnabled} = getCookieData<{notificationsEnabled: string}>();

    function displaySystemNotification(notify) {
        if (Notification?.permission === "granted" && notificationsEnabled === 'true') {
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
            
            navigator.serviceWorker.getRegistration('./sw.js')
                .then((registration) => {
                    registration?.showNotification(title, {
                        icon: img,
                        body: text,
                        tag: "gekkardTx"
                    });
                });
        }
    }
    
    function connectES() {
        esLink = new EventSource(import.meta.env.VITE_API_URL + "notify/v1/Subscribe", { withCredentials: true });
        
        esLink.onmessage = ev => handleReceivedMessage(ev.data);
        esLink.onerror = ev => {
            console.error(ev);
        };
    }
    
    // function closeES() {
    //     esLink?.close();
    // }
    
    // function requestPerm() {
    //     Notification.requestPermission();
    // }

    function handleReceivedMessage(message) {
        setRefresh();

        if (typeof message !== "string") {
            console.log(message);
            return;
        }
        try {
            const jsonValue = JSON.parse(message);

            console.log(jsonValue);

            displaySystemNotification(jsonValue);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (notificationsEnabled === 'true') {
            navigator.serviceWorker.register('./sw.js');
        }

        connectES();
    }, []);

    return <div>
        {children}
    </div>;
}

export default SystemNotifications;
