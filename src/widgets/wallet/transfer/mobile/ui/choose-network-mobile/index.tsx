import {useContext, useEffect, useState} from "react";
import InfoBox from "@/widgets/info-box";
import {useNavigate, useParams} from "react-router-dom";
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

const ChooseNetworkMobile = ({withdraw = false}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {currencies} = useContext(CtxCurrencies);
    const {currency} = useParams()
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
    
    return( 
        <>
            <div className="row w-full font-medium">
                <div className="col">
                    <Select
                        open={open}
                        onDropdownVisibleChange={(visible) => setOpen(visible)}
                        dropdownStyle={{backgroundColor:"transparent", boxShadow:"none"}}
                        className="w-full"
                        placeholder={"Networks not found"} value={networkTypeSelect}
                        options={networksForSelector}
                        listHeight={500}
                        dropdownRender={(menu)=>{
                            return(
                                <div 
                                    className='h-[380px] overflow-auto'
                                >
                                        {networkList.map((el)=>{
                                            return(
                                                <div style={{backgroundColor:`${(networkTypeSelect === el.value)?"#7B797C":"white"}`, display:"flex", alignItems:"center", justifyContent:"start", paddingLeft:"5px", color:"#3A5E66"}} onClick={()=>{setNetworkType(el.value);setOpen(false)}}className={`grid grid-cols-[repeat(3,1fr)] grid-rows-[1fr] gap-x-2.5 gap-y-0 mb-[5px] items-center justify-center gap-[5px] rounded-md h-[30px] bg-opacity-1 border-[1px] border-solid border-[#E0E0E0]`}>
                                                    <span className='self-center text-[12px]'>{el.label}</span>
                                                </div>
                                            )
                                        })}
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ChooseNetworkMobile;
