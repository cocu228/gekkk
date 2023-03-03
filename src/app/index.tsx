import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ConfigProvider theme = {{
            token: {
                fontFamily: 'inherit'
            },
        }}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>
)
