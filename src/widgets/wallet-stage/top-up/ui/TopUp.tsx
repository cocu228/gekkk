import {useEffect, useState} from 'react';
import {storeListAddresses} from "@/shared/store/crypto-assets";
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet-stage/top-up/ui/ChoseNetwork";
import {CtxTopUp} from "@/widgets/wallet-stage/top-up/model/context";
import {apiTokenNetworks} from "@/shared/api";
import {helperApiTokenNetworks, helperSortingList} from "@/widgets/wallet-stage/top-up/model/helper";

// const fiatTabs: Record<string, string> = {
//     'gek_card': 'Payment Card',
//     'crypto': 'Blockchain wallet',
// }
//
// const cryptoTabs: Record<string, string> = {
//     'crypto': 'Blockchain wallet',
// }


const TopUp = ({currency}) => {
    const getListAddresses = storeListAddresses(state => state.getListAddresses)

    const [state, setState] = useState({
        list: null,
        loading: true,
        hash: null,
        isUpdateNow: ""
    })


    useEffect(() => {

        (async () => {

            setState(prevState => ({...prevState, list: null, hash: null, loading: true}))

            const listAddresses = await getListAddresses()

            const response = await apiTokenNetworks(currency.const);

            helperApiTokenNetworks(response).success((data) => {
                setState(prev => ({
                    ...prev,
                    list: helperSortingList(listAddresses, data),
                    loading: false
                }))
            })

        })()

    }, [currency, state.isUpdateNow])

    return (<div className="wrapper">
        <CtxTopUp.Provider value={{...state, setState}}>
            {state.loading ? <Loader/> : <ChoseNetwork currency={currency}/>}
        </CtxTopUp.Provider>
    </div>)

};

export default TopUp;
