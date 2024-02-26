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

const TopUp = memo(() => {
    const {t} = useTranslation()
    const {initialLanguage} = getInitialProps()
    
    const navigate = useNavigate();
    const {offline} = useContext(CtxOfflineMode);
    const {loading = true, networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);
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
                        You can top up your EURG wallet via fiat on the EUR withdrawal form <span
                        className="text-blue-400 cursor-pointer"
                        onClick={() => navigate("/wallet/EUR/withdraw")}>link</span>
                    </b>
                </div>;
            case 151:
                return <TopUpFormSepa/>;
            case 154:
                return <div>
                    <b>
                        You can top up your EUR wallet via cryptocurrency on the EURG withdrawal form <a
                        className="text-blue-400"
                        onClick={() => navigate("/wallet/EURG/withdraw")}
                        href="javascript:void(0)">link</a>
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
    },[initialLanguage])

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
