import {CtxWalletCurrency, CtxWalletNetworks, ICtxWalletNetworks} from "@/widgets/wallet-stage/top-up/model/context";
import React, {useContext, useEffect, useState} from "react";
import {apiTokenNetworks, IResTokenNetwork} from "@/shared/api";
import {
    helperApiTokenNetworks,
    sortingAddressesForSelector,
    sortingAddressesForCurrency
} from "@/widgets/wallet-stage/top-up/model/helper";
import {storeListAddresses} from "@/shared/store/crypto-assets";
import {AxiosResponse} from "axios";


interface IProps {
    children: React.ReactNode
}

const NetworkHOC = ({children}: IProps) => {

    const getListAddresses = storeListAddresses(state => state.getListAddresses)
    const currency = useContext(CtxWalletCurrency)

    const [state, setState] = useState<Omit<ICtxWalletNetworks, "setState">>(
        {
            addressesForSelector: null,
            loading: true,
            refreshKey: null
        }
    )

    useEffect(() => {

        (async () => {

            setState(prevState => ({...prevState, addressesForSelector: null, loading: true}))

            const addresses = await getListAddresses()

            const response: AxiosResponse = await apiTokenNetworks(currency.const);

            helperApiTokenNetworks(response).success((data: IResTokenNetwork) => {
                setState(prev => ({
                    ...prev,
                    addressesForSelector: sortingAddressesForSelector(sortingAddressesForCurrency(addresses, data)),
                    loading: false
                }))
            })

        })()

    }, [currency, state.refreshKey])

    return <CtxWalletNetworks.Provider value={({...state, setState})}>{children}</CtxWalletNetworks.Provider>

}

export default NetworkHOC