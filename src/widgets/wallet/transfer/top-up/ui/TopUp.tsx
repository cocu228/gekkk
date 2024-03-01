import {memo, useContext, useEffect, useState} from 'react';
import Loader from "@/shared/ui/loader";
import TopUpFormQR from "@/widgets/wallet/transfer/top-up/ui/forms/TopUpFormQR";
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import {CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import TopUpFormSepa from "@/widgets/wallet/transfer/top-up/ui/forms/TopUpFormSepa";
import {
    getChosenNetwork, isCryptoNetwork,
} from "@/widgets/wallet/transfer/model/helpers";
import {useNavigate} from "react-router-dom";
import {CtxOfflineMode} from "@/processes/errors-provider-context";
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import ApplyTransferCode from "./forms/ApplyTransferCode";
import { t } from 'i18next';
import { getInitialProps, useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';

const TopUp = memo(() => {
    const {t} = useTranslation()
    const {initialLanguage} = getInitialProps()
    const {md} = useBreakpoints()
    const navigate = useNavigate();
    const {offline} = useContext(CtxOfflineMode);
    const {loading = true, networkTypeSelect, tokenNetworks, setNetworkType} = useContext(CtxWalletNetworks);
    const {
        is_operable = null,
        network_type: networkType
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
    
    if (offline) return <div>You are offline, please check your internet connection.</div>
    
    const getDisplayForm = (networkType: number): JSX.Element => {
        if (isCryptoNetwork(networkType)) {
            return <TopUpFormQR/>;
        }
        
        switch (networkType) {
            case 150:
                return <div>
                    <b>
                        {t("top_up_EURG")} <span
                            className="text-blue-400 cursor-pointer"
                            onClick={() => {
                                if(md){
                                    navigate(`/transfers?currency=EUR&type=154`)
                                }else{
                                    navigate("/wallet/EUR/withdraw")
                                }
                                    
                            }}
                        >
                            {t("link")}
                        </span>
                    </b>
                </div>;
            case 151:
                return <TopUpFormSepa/>;
            case 154:
                return <div>
                    <b>
                        {t("top_up_EUR_via_crypto")} <a
                        className="text-blue-400"
                        onClick={() => {
                            if(md){
                                navigate(`/transfers?currency=EURG&type=150`)
                            }else{
                                navigate("/wallet/EURG/withdraw")
                            }
                                
                        }}
                        href="javascript:void(0)">{t("link")}</a>
                    </b>
                </div>;
            case 231:
                return <ApplyTransferCode/>;
            
            default:
                return <div>
                        {t("no_actions_for_network")}
                </div>;
        }
    }
    const [displayedForm, setDisplayedForm] = useState(getDisplayForm(networkTypeSelect))

    useEffect(()=>{
        setDisplayedForm(getDisplayForm(networkTypeSelect))
    },[initialLanguage, networkTypeSelect])


    return (<div className="wrapper">
        {loading ? <Loader/> : <>
            <ChoseNetwork/>
            {displayedForm}

            {is_operable === false && <div className="row mb-4 mt-4">
                <div className="col">
                    <div className="info-box-danger">
                        
                        <p>{t("attention")}</p>
                    </div>
                </div>
            </div>}
        </>}
    </div>);
});

export default TopUp;
