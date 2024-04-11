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
        <>
            <div 
                onClick={()=>{
                    setNetwork(null)
                    navigate(`/transfers?currency=${currency}`)
                }} 
                className="row w-full relative cursor-pointer h-[32px] items-center overflow-hidden flex flex-row font-medium border-[1px] rounded-[5px] border-solid border-[#E0E0E0]"
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
                <div className='absolute right-0 h-full w-[22px] flex justify-center items-center bg-[#3A5E66]'>
                    <svg width="12" height="7" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6.82721L14.4826 0.263604C14.8297 -0.087868 15.3925 -0.087868 15.7397 0.263604C16.0868 0.615076 16.0868 1.18492 15.7397 1.5364L8.62854 8.7364C8.28141 9.08787 7.71859 9.08787 7.37146 8.7364L0.260349 1.5364C-0.0867844 1.18492 -0.0867844 0.615076 0.260349 0.263604C0.607482 -0.087868 1.1703 -0.087868 1.51743 0.263604L8 6.82721Z" fill="#FFFFFF"/>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default ChooseNetworkMobile;

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }