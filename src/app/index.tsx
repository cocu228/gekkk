import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import {ConfigProvider} from 'antd'
import "./index"
import "../processes/i18n.config";

import ThemeCustomization from '@/materialUI'

declare global {
    interface String {
        capitalize(): String;
    }
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function (this: string): string {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

if (!navigator.onLine) {
    alert("No internet access")
}

function updateOnlineStatus(event) {
    const condition = navigator.onLine ? "online" : "offline";
    alert(condition)
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <ThemeCustomization>
        <ConfigProvider theme={{
            token: {
                fontFamily: 'inherit'
            },
        }}>
            <App/>
        </ConfigProvider>
    </ThemeCustomization>
    // </React.StrictMode>
)
