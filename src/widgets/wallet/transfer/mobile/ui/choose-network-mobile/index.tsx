import React, {useContext, useEffect, useState} from "react";
import InfoBox from "@/widgets/info-box";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {CtxCurrencies, ICtxCurrency} from "@/processes/CurrenciesContext";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useTranslation} from "react-i18next";
import {isCryptoNetwork} from "@/widgets/wallet/transfer/model/helpers";
import NetworkProvider from "../../../model/NetworkProvider";
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
                className="row w-full font-medium"
            >
                <div className="col">
                    <Select
                        open={open}
                        onDropdownVisibleChange={(visible) => setOpen(visible)}
                        dropdownStyle={{backgroundColor:"transparent", boxShadow:"none"}}
                        className="w-full"
                        placeholder={<div onClick={()=>{setNetwork(null)}} className="flex w-full text-[12px] text-[#3A5E66] h-full justify-start items-center">
                            {(!networksForSelector?.length && !loading) ? <span>
                                {t("networks_not_found")}
                            </span> : loading ? <div className="flex items-center justify-center w-full relative"><Loader className="w-[24px] h-[24px]"/></div> : !network ? <span className="text-[12px] text-[#3A5E66]">{t("choose_network_type")}</span> : <span className="text-[12px] text-[#3A5E66]">
                                {[...networksForSelector].filter(el => el.value === network)[0]?.label}
                            </span>}
                            
                        </div>} 
                        // value={networkTypeSelect}
                        listHeight={500}
                        // dropdownRender={(menu)=>{
                        //     return(
                        //         <div 
                        //             className='h-[380px] overflow-auto'
                        //         >
                        //                 {networkList.map((el)=>{
                        //                     return(
                        //                         <div 
                        //                             style={{backgroundColor:`${(networkTypeSelect === el.value)?"#7B797C":"white"}`, display:"flex", alignItems:"center", justifyContent:"start", paddingLeft:"5px", color:"#3A5E66"}} 
                        //                             onClick={()=>{setNetworkType(el.value);setOpen(false)}}
                        //                             className={`grid grid-cols-[repeat(3,1fr)] grid-rows-[1fr] gap-x-2.5 gap-y-0 mb-[5px] items-center justify-center gap-[5px] rounded-md h-[30px] bg-opacity-1 border-[1px] border-solid border-[#E0E0E0]`}
                        //                         >
                        //                             <span className='self-center text-[12px]'>{el.label}</span>
                        //                         </div>
                        //                     )
                        //                 })}
                        //         </div>
                        //     )
                        // }}
                        notFoundContent={null}
                        suffixIcon={<div className='w-[20px] h-full'>
                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 6.82721L14.4826 0.263604C14.8297 -0.087868 15.3925 -0.087868 15.7397 0.263604C16.0868 0.615076 16.0868 1.18492 15.7397 1.5364L8.62854 8.7364C8.28141 9.08787 7.71859 9.08787 7.37146 8.7364L0.260349 1.5364C-0.0867844 1.18492 -0.0867844 0.615076 0.260349 0.263604C0.607482 -0.087868 1.1703 -0.087868 1.51743 0.263604L8 6.82721Z" fill="#B4C0CD"/>
                            </svg>
                        </div>}
                    />
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