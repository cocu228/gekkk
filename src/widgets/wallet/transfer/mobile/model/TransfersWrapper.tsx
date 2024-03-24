import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { CtxWalletNetworks } from "../../model/context";
import searchIcon from '../../../../../../public/img/icon/search-normal.svg'
import Input from '@/shared/ui/input/Input';
import { useTranslation } from "react-i18next";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { getRoundingValue } from "@/shared/lib";
import Loader from "@/shared/ui/loader";
import { useNavigate } from "react-router-dom";


type IProps = {
    children: JSX.Element[] | [JSX.Element],
    curr:string,
    setCurr: Dispatch<SetStateAction<string>>,
    network: number,
    setNetwork: Dispatch<SetStateAction<number>>,
    loading:boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function TransfersWrapper({children, curr, setCurr, network, setNetwork, loading, setLoading}: IProps) {

    const {networkTypeSelect, networksForSelector, setNetworkType} = useContext(CtxWalletNetworks);
    const inputRef = useRef(null);
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [searchValue, setSearchValue] = useState<string>('');
    const {currencies} = useContext(CtxCurrencies);
    const currenciesList = currencies ? [...currencies]?.map(el => {
        return{
            $const: el[0],
            currency:el[1]
        }
    }).sort((x,y) => { 
        return x.$const == "EUR" ? -1 : y.$const == "EUR" ? 1 : 0; 
      }) : []    

    
    function returnTitle(tag){
        
        if(tag === "select_currency"){            
            return `${t("currency")}:`
        }else if(tag === "choose_network"){
            return `${t("type")}:`
        }
    }

    function returnText(tag){
        
        if(tag === "select_currency" && !curr){            
            return t("select_the_currency")
        }else if(tag === "select_currency" && curr){
            return ""
        }else if(tag === "choose_network" && !network && !!networksForSelector?.length && !loading){
            return t("select_transfer_type")
        }else if(tag === "choose_network" && network){
            return ""
        }
    }
    function searchTokenFilter(currency: ICtxCurrency, searchValue: string) {
        return (currency.$const?.toLowerCase().includes(searchValue) ||
            currency.name?.toLowerCase().includes(searchValue)) && currency.availableBalance;
    }

    return (
        <>
            {
                children.map((child, index):JSX.Element => {
                    if(child?.props["data-tag"] !== "main" && child){
                        return(
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex h-[54px] w-full items-center flex-row justify-start mb-5 rounded-[8px] bg-[white]">
                                    <span className="ml-5 min-w-[80px] text-[12px] text-[#1F3446] font-bold text-start">{returnTitle(child?.props["data-tag"])}</span>
                                    <div className="flex w-[236px] justify-center items-center">{child}</div>
                                </div>
                                {returnText(child?.props["data-tag"])  && <span className="w-full flex flex-col self-start text-[12px] text-[#1F3446] font-bold items-start mb-5">
                                    {returnText(child?.props["data-tag"])}
                                </span>}
                                {!curr && <div className="min-h-[200px]  gap-5 w-full">
                                    <div className="bg-[white] border-[1px] border-solid border-[#DCDCD9] w-full flex gap-[9px] px-[18px] py-2.5 rounded-lg">
                                        <img src={searchIcon}/>
                                        <Input 
                                            className={`w-full border-[none]`}
                                            wrapperClassName={'w-full'}
                                            style={{height:"10px", border:'none'}}
                                            type="text" 
                                            ref={inputRef}
                                            data-testid="SearchName"
                                            placeholder={t("crypto_assets.search_currency")}
                                            onChange={(e) => {
                                                setSearchValue(e.target.value.trim().toLowerCase());
                                            }}
                                        />
                                    </div> 
                                    {currenciesList
                                        .filter((curr) => searchTokenFilter(curr.currency, searchValue))
                                        .map((currency, index) => (
                                            <div 
                                                className="w-full flex justify-between min-h-[60px] mt-2 bg-[white] rounded-lg cursor-pointer"
                                                onClick={()=>{
                                                    setCurr(currency.$const)
                                                    setLoading(true)
                                                    navigate(`/transfers?currency=${currency.$const}`)
                                                }}
                                            >
                                                <div className="ml-2 flex flex-row p-2 gap-5 justify-center items-center ">
                                                    <IconCoin height={40} code={currency.$const}/>
                                                    <span className="text-[12px] text-[#1F3446] font-bold">{currency.$const}</span>
                                                </div>
                                                <div className="mr-2 flex flex-col justify-evenly p-2 min-w-[150px]">
                                                    <span className="self-start text-[12px] text-[#7B797C] font-regular">{t("free_balance")}:</span>
                                                    <span className="self-end text-[12px] text-[#1F3446] font-regular">{getRoundingValue(currency.currency.availableBalance, currency.currency.roundPrec)} {currency.$const}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>}
                                {!!((!network && child?.props["data-tag"] === "choose_network") && (curr && networksForSelector?.length) && !loading) ? <div className="min-h-[200px] gap-5 w-full">
                                    {networksForSelector
                                        ?.map((network) => (
                                            <div 
                                                className="w-full flex justify-between items-center min-h-[60px] mt-2 pl-5 bg-[white] rounded-lg cursor-pointer"
                                                onClick={()=>{
                                                    setNetworkType(network.value)
                                                    setNetwork(network.value)
                                                    navigate(`/transfers?currency=${curr}&type=${network.value}`)
                                                }}
                                            >
                                                <span className="text-[12px] text-[#1F3446] font-bold">{network.label}</span>
                                            </div>
                                        ))
                                    }
                                </div> : (loading && !network && child?.props["data-tag"] === "choose_network") ? <div className="min-h-[200px] flex justify-center w-full relative"><Loader/></div> : null}
                            </div>
                        )
                    }else{
                        return(
                            <div className="flex justify-center w-full">
                                {child}
                            </div>
                        )
                    }
                })
            }
        </>
    )
}