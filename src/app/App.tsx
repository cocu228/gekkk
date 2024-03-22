import Decimal from "decimal.js";
// import AppRouter from './providers/AppRouter';
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
import AppRouter from "@/app/providers/AppRouter";
import { useEffect } from "react";

function App() {
    Decimal.set({ toExpNeg: -18 });

    let esLink = null;
    let activeNotify = null;

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

            if (!document.hasFocus())
                displaySystemNotification(jsonValue);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        connectES();
        // const externalForm = document.getElementById('logoC');
        // if (externalForm) {
        //   externalForm.style.display = 'none';
        // }
    }, []);

    return (
        <BreakpointsProvider>
            <AppRouter />
        </BreakpointsProvider>
    );
}

export default App;
