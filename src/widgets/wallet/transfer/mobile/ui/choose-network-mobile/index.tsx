import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useTranslation} from "react-i18next";
import { Select } from "antd";
import Loader from "@/shared/ui/loader";
import { useQuery } from "@/shared/lib";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";

const ChooseNetworkMobile = ({withdraw = false, network, setNetwork, loading}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const query = useQuery()
    const currency = query.get("currency")
    const [open, setOpen] = useState<boolean>(false)
    const {displayHistory} = useContext(CtxDisplayHistory);

    const {networksForSelector} = useContext(CtxWalletNetworks);

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
                    setNetwork(null);
                    displayHistory(false);
                    navigate(`/transfers?currency=${currency}`);
                }}
                className="row w-full relative cursor-pointer h-[32px] border-r-[0px] rounded-l-[8px] items-center overflow-hidden flex flex-row font-medium border-[1px] border-solid border-[var(--gek-light-grey)]"
            >
                <Select
                    open={open}
                    bordered={false}
                    onDropdownVisibleChange={(visible) => setOpen(visible)}
                    className="w-full"
                    placeholder={<div onClick={()=>{setNetwork(null)}} className="flex w-full text-[12px] text-[#3A5E66] h-full justify-start items-center">
                        {(!networksForSelector?.length && !loading) ? <span className="inline-flex justify-center w-full text-[10px] text-[var(--gek-mid-grey)]">
                            {t("networks_not_found")}
                        </span> : loading ? <div className="flex items-center justify-center w-full relative"><Loader className="w-[24px] h-[24px]"/></div> : !network ? <span className="inline-flex justify-center w-full text-[10px] text-[var(--gek-mid-grey)]">-{t("select")}-</span> : <span className="text-[12px] text-[#3A5E66]">
                            {[...networksForSelector].filter(el => el.value === network)[0]?.label}
                        </span>}
                        
                    </div>} 
                    listHeight={500}
                    notFoundContent={null}
                    suffixIcon={null}
                />
            </div>
            <div className='rounded-r-[8px] h-full min-w-[22px] flex justify-center items-center bg-[#3A5E66]'>
                <IconApp code='t08' color='#fff' size={12} className={"rotate-90"} />
            </div>
        </div>
    )
}

export default ChooseNetworkMobile;
