import {Outlet} from 'react-router';
import Loader from "@/shared/ui/loader";
import Header from "@/widgets/header/ui/";
import Main from "@/app/layouts/main/Main";
import {memo, useEffect, useState} from 'react';
import Content from "@/app/layouts/content/Content";
import {CtxCurrencyData} from '../CurrenciesContext';
import {actionResSuccess, randomId} from '@/shared/lib/helpers';

export default memo(function () {
    const [{
        refreshKey,
        // currencies,
    }, setState] = useState({
        refreshKey: "",
        // currencies: new Map<string, ICtxCurrencyData>()
    })

    const setRefresh = () =>
        setState(prev => ({
            ...prev,
            refreshKey: randomId()
        }));

    useEffect(() => {

    }, [refreshKey]);

    return <CtxCurrencyData.Provider value={{
        // currencies,
        setRefresh: setRefresh,
        refreshKey
    }}>
        <>
            <Header/>
            {(
                <Main>
                    <Content>
                        <Outlet/>
                    </Content>
                </Main>
            )}
        </>
    </CtxCurrencyData.Provider>
});
