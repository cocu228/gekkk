import {useContext, useEffect} from "react";
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
    
    
    
    const {setNetworkType, networksForSelector, networkTypeSelect} = useContext(CtxWalletNetworks);
    const noteVisible = !withdraw
        && !(Array.isArray(networksForSelector) && networksForSelector.length === 0)
        && currency !== "EURG"
        && (isCryptoNetwork(networkTypeSelect));
        console.log(networksForSelector);
        
    
    return( 
        <>
            <div className="row w-full font-medium">
                <div className="col">
                    <Select
                        className="w-full"
                        placeholder={"Networks not found"} value={networkTypeSelect}
                        onSelect={setNetworkType}
                        options={networksForSelector}
                        listHeight={500}
                    />
                </div>
            </div>
        </>
    )
}

export default ChooseNetworkMobile;
