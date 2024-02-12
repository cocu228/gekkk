import {useContext, useEffect} from "react";
import InfoBox from "@/widgets/info-box";
import {useNavigate, useParams} from "react-router-dom";
import Select from "@/shared/ui/select/Select";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {CtxCurrencies, ICtxCurrency} from "@/processes/CurrenciesContext";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useTranslation} from "react-i18next";
import {isCryptoNetwork} from "@/widgets/wallet/transfer/model/helpers";
import NetworkProvider from "../../model/NetworkProvider";

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
    
    return( 
        <>
            <div className="row mb-8 w-full font-medium">
                {(Array.isArray(networksForSelector) && networksForSelector.length < 2) ? null :
                    withdraw ? t("select_withdraw_network") : t("select_network")}
                <div className="col">
                    {Array.isArray(networksForSelector) &&
                    networksForSelector.length === 0 ?
                        <InfoBox
                            message={<span>
                    At the moment there is not a single option available
                    for {withdraw ? 'withdraw' : 'top up'} this asset. Please check it later.
                                {!currencies.get(currency)?.flags[CurrencyFlags.ExchangeAvailable]
                                    ? null
                                    : (
                                        <span> Or you can create a <span
                                            className='text-blue-400 hover:cursor-pointer hover:underline'
                                            onClick={() => navigate(`/exchange?${withdraw ? 'from' : 'to'}=${currency}`)}
                                        >
                            {withdraw ? 'sell' : 'buy'} order
                        </span>.</span>
                                    )}
                </span>}/> :
                        Array.isArray(networksForSelector) && networksForSelector.length === 1 ?
                        <h3 className="mt-4 font-bold">{networksForSelector[0].label}</h3> :
                            Array.isArray(networksForSelector) &&
                            <Select className="w-full mt-2"
                                    placeholder={"Networks not found"} value={networkTypeSelect}
                                    onSelect={setNetworkType}
                                    options={networksForSelector}
                                    listHeight={500}
                        />}
                </div>
            </div>
            {noteVisible && <div className="row mb-10">
                <div className="col">
                    <div className="info-box-note mb-10">
                        <div className="row mb-3">
                            <div className="col">
                                <span className="text-red-800">Please note</span>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col">
                                <span
                                    className="text-gray-400 font-medium text-fs14 leading-6">You should send only <b>{currency}</b> to supported network address on Gekkoin platform. If you are top up via another network your assets may be lost.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ChooseNetworkMobile;
