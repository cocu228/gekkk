import {Outlet, Navigate} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import Main from "@/app/layouts/Main";
import Content from "@/app/layouts/Content";
import {useEffect} from "react";
import {assetsCoinsName} from "@/shared/store";
import {useSessionStorage} from "usehooks-ts";
import Loader from "@/shared/ui/loader";
import Decimal from 'decimal.js';

export default () => {

    const [{phone}] = useSessionStorage("session-auth", {phone: ""})
    const [{token}] = useSessionStorage("session-global", {token: "", phone: ""})

    const assets = assetsCoinsName(state => state.assets)
    const useAssetsRootLayout = assetsCoinsName(state => state.getAssets)

    useEffect(() => {
        useAssetsRootLayout(phone, token)
    }, [])

    return <>
        <Header/>
        {assets.length > 0 ? <Main>
            <Sidebar/>
            <Content>
                <Outlet/>
            </Content>
        </Main> : <Loader/>}
    </>
}