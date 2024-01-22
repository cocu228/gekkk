import Decimal from "decimal.js";
// import AppRouter from './providers/AppRouter';
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
import Auth from "@/pages/auth";
import ReactDOM from 'react-dom';
import ThemeCustomization from "@/materialUI";
import {ConfigProvider} from "antd";
import React, {useEffect} from "react";
import {getCookieData} from "@/shared/lib/helpers";


const loadMainComponent = async () => {
    const {default: MainComponent} = await import('./providers/AppRouter');
    return MainComponent;
};

function App() {
    Decimal.set({toExpNeg: -18});


    const {device_guid} = getCookieData<{ device_guid?: string }>();

    useEffect(() => {
        if (device_guid) {
            // Динамическая загрузка основного компонента при успешной регистрации
            loadMainComponent().then(MainComponent => {
                ReactDOM.render(<div>
                    <ThemeCustomization>
                        <ConfigProvider theme={{
                            token: {
                                fontFamily: 'inherit'
                            },
                        }}>
                            <MainComponent/>
                        </ConfigProvider>
                    </ThemeCustomization>
                </div>, document.getElementById('root'));
            });
        }
    }, [device_guid]);

    return (
        <BreakpointsProvider>
            <Auth/>
        </BreakpointsProvider>
    );
}

export default App;
