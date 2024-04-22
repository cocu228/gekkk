import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {useTranslation} from "react-i18next";
import {isCryptoNetwork} from "@/widgets/wallet/transfer/model/helpers";
import { Select } from "antd";
import Loader from "@/shared/ui/loader";

const ChooseNetworkMobile = ({withdraw = false, network, setNetwork, loading}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const query = useQuery()
    const currency = query.get("currency")
    const {currencies} = useContext(CtxCurrencies);
    const [open, setOpen] = useState<boolean>(false)

    const {setNetworkType, networksForSelector, networkTypeSelect} = useContext(CtxWalletNetworks);
    
    const noteVisible = !withdraw
        && !(Array.isArray(networksForSelector) && networksForSelector.length === 0)
        && currency !== "EURG"
        && (isCryptoNetwork(networkTypeSelect));
        
    const networkList = networksForSelector ? networksForSelector.map(el => {
        return {
            value:el.value,
            label:<div className='w-full items-center flex justify-center color-[#3A5E66]'>
                {el.label}
            </div> 
        }
    }) : [{
        value:0,
        label:"none"
    }]

    useEffect(()=>{
        if(!query.get("type")){
            setNetwork(null)
        }else{
            setNetwork(+query.get("type"))
        }
    },[])
    
    return( 
        <div className="w-full relative h-[32px] flex flex-row">
            <div 
                onClick={()=>{
                    setNetwork(null)
                    navigate(`/transfers?currency=${currency}`)
                }} 
                className="row w-full relative cursor-pointer h-[32px] border-r-[0px] rounded-tl-[5px] rounded-bl-[5px] items-center overflow-hidden flex flex-row font-medium border-[1px] border-solid border-[#DCDCD9]"
            >
                <Select
                    open={open}
                    bordered={false}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    className="w-full"
                    placeholder={<div onClick={()=>{setNetwork(null)}} className="flex w-full text-[12px] text-[#3A5E66] h-full justify-start items-center">
                        {(!networksForSelector?.length && !loading) ? <span className="inline-flex justify-center w-full text-[10px] text-[#B9B9B5]">
                            {t("networks_not_found")}
                        </span> : loading ? <div className="flex items-center justify-center w-full relative"><Loader className="w-[24px] h-[24px]"/></div> : !network ? <span className="inline-flex justify-center w-full text-[10px] text-[#B9B9B5]">{t("choose_network_type")}</span> : <span className="text-[12px] text-[#3A5E66]">
                            {[...networksForSelector].filter(el => el.value === network)[0]?.label}
                        </span>}
                        
                    </div>} 
                    listHeight={500}
                    notFoundContent={null}
                    suffixIcon={null}
                />
            </div>
            <div className='rounded-tr-[5px] rounded-br-[5px] h-full min-w-[22px] flex justify-center items-center bg-[#3A5E66]'>
                <svg className={`${network && "rotate-180"}`} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6286 0.5L12 1.8125L6 7.5L0 1.8125L1.37143 0.5L6 4.875L10.6286 0.5Z" fill="white"/>
                </svg>
            </div>
        </div>
    )
}

export default ChooseNetworkMobile;

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }