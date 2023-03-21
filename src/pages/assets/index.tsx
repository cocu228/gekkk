import React, {useEffect, useState} from 'react'
import {NavLink} from "react-router-dom";
import { apiGetMarketAssets, apiGetRates } from '@/shared/api/market';
import $const from "@/shared/config/coins/constants";

function Assets() {

    const [rates, setRates] = useState<Record<$const, number>>();
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        (async () => {
            
            const rates = (await apiGetRates()).data;                
            const tokens = (await apiGetMarketAssets()).data;
            setRates(rates);
            setTokens(tokens);
        })();              
      }, []);
 

    if (!rates || !tokens) return <div>Loading...</div>; 
    
    //const costPresentTokens = tokens.filter(token => rates[token.code] && rates[token.code] !== 0)
    //const costNotPresentTokens = tokens.filter(value => !costPresentTokens.includes(value));
    
    return (
        <div>Content...</div>
    )
}
  
export default Assets;
