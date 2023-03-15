import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import {ConfigProvider} from 'antd'

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <ConfigProvider theme={{
        token: {
            fontFamily: 'inherit'
        },
    }}>
        <App/>
    </ConfigProvider>
    // </React.StrictMode>
)
