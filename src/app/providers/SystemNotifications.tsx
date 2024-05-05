import { getCookieData } from "@/shared/lib";
import { useContext, useEffect } from "react";
import { CtxRootData } from "@/processes/RootContext";

interface IParams {
    children?: JSX.Element;
}

const SystemNotifications = ({children}: IParams) => {
    let esLink = null;
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
            
            navigator.serviceWorker.getRegistration('./sw.js')
                .then((registration) => {
                    registration?.showNotification(title, {
                        icon: img,
                        body: text,
                        tag: "gekkardTx"
                    });

                    console.log('notification displayed')
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
        if (Notification?.permission === 'granted') {
            navigator.serviceWorker.register('./sw.js');
            
            console.log('registered sw')
        }

        connectES();
    }, []);

    return <div>
        {children}
    </div>;
}

export default SystemNotifications;
