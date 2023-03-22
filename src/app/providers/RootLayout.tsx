import {Outlet} from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import Main from "@/app/layouts/Main";
import Content from "@/app/layouts/Content";
import {useEffect, useState} from "react";
import Loader from "@/shared/ui/loader";
import {storeListAllCryptoName} from "@/shared/store/crypto-assets/list-all-name";
import {storeListAvailableBalance} from "@/shared/store/crypto-assets/list-available-balance";
import {storeListAddresses} from "@/shared/store/crypto-assets/list-addresses";

export default () => {

    // const [, setSessionGlobal] = useSessionStorage("session-global", {})

    const getListAllCryptoName = storeListAllCryptoName(state => state.getListAllCryptoName)
    const getDefaultListBalance = storeListAvailableBalance(state => state.getDefaultListBalance)
    const setSortedListBalance = storeListAvailableBalance(state => state.setSortedListBalance)
    const getListAddresses = storeListAddresses(state => state.getListAddresses)

    const [state, setState] = useState({
        loading: true
    })

    useEffect(() => {

        (async function () {


            const listAllCryptoName = await getListAllCryptoName()

            // setSessionGlobal(prevState => ({...prevState, listAllCryptoName: listAllCryptoName}))

            if (await getDefaultListBalance()) {
                setSortedListBalance(listAllCryptoName) ? setState(prevState => ({
                    ...prevState,
                    loading: false
                })) : null

            }
            // TODO: Переместить в wallet
            await getListAddresses()
        })()
    }, [])

    return <>
        <Header/>
        {!state.loading ? <Main>
            <Sidebar/>
            <Content>
                <Outlet/>
            </Content>
        </Main> : <Loader/>}
    </>
}