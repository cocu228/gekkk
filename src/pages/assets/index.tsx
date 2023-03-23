import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import { apiGetMarketAssets, apiGetRates } from '@/shared/api/market';
import $const from "@/shared/config/coins/constants";
import {storeListAllCryptoName} from "@/shared/store/crypto-assets";

function Assets() {

    const [rates, setRates] = useState<Record<$const, number>>();
    // const listAllCryptoName = storeListAllCryptoName(state => state.listAllCryptoName);

    useEffect(() => {
        (async () => {

            const rates = (await apiGetRates()).data;
            setRates(rates);

        })();
    }, []);


    if (!rates) return <div>Loading...</div>;

    //const costPresentTokens = tokens.filter(token => rates[token.code] && rates[token.code] !== 0)
    //const costNotPresentTokens = tokens.filter(value => !costPresentTokens.includes(value));

    return (
        <div>Content...</div>
    )
}
  
export default Assets;
