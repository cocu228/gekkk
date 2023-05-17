import {IResMarketAsset} from "@/shared/api";
import React, {useEffect, useState} from "react";
import {CtxCurrencyData} from "@/widgets/wallet/model/context";
import {ISortedListBalance} from "@/shared/model/sorting-list-balance";
import {storeListAllCryptoName, storeListAvailableBalance} from "@/shared/store/crypto-assets";
import { useNavigate } from "react-router-dom";
import PageProblems from "@/pages/page-problems/PageProblems";

interface IProps {
    children: React.ReactNode;
    currency: string;
}

const CurrencyDataProvider = ({children, currency}: IProps) => {
    const assets = storeListAllCryptoName(state => state.listAllCryptoName);
    const wallets = storeListAvailableBalance(state => state.sortedListBalance);
    const [selectedAsset, setSelectedAsset] = useState<IResMarketAsset>();
    const [selectedBalance, setSelectedBalance] = useState<ISortedListBalance>();

    if (!assets)
        return <></>;

    useEffect(() => {
        setSelectedAsset(assets.find(a => a.code === currency));
        setSelectedBalance(wallets.find(w => w.const === currency));
    }, [currency])

    return <CtxCurrencyData.Provider
        value={{
            asset: selectedAsset,
            wallet: selectedBalance
        }}>
            {children}
        </CtxCurrencyData.Provider>

}

export default CurrencyDataProvider;
