import {useContext, useEffect} from "react";
import InfoBox from "@/widgets/info-box";
import {useNavigate} from "react-router-dom";
import Select from "@/shared/ui/select/Select";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {useTranslation} from "react-i18next";
import {isCryptoNetwork} from "@/widgets/wallet/transfer/model/helpers";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const ChoseNetwork = ({withdraw = false}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {$const} = useContext(CtxWalletData);
    const {md} = useBreakpoints()
    const {currencies} = useContext(CtxCurrencies);
    
    const {setNetworkType, networksForSelector, networkTypeSelect} = useContext(CtxWalletNetworks);
    const noteVisible = !withdraw
        && !(Array.isArray(networksForSelector) && networksForSelector.length === 0)
        && $const !== "EURG"
        && (isCryptoNetwork(networkTypeSelect));
    
    return <>
        <div className="row mb-8 w-full font-medium">
            {(Array.isArray(networksForSelector) && networksForSelector.length < 2) ? null :
                withdraw ? t("select_withdraw_network") : t("select_network")}

            <div className="col">
                {Array.isArray(networksForSelector) &&
                networksForSelector.length === 0 ?
                    <InfoBox
                        message={<span>
                {t("not_a_single_option_aviable", {do: withdraw ? t("to_withdraw") : t("to_top_up")})}
                            {!currencies.get($const).flags[CurrencyFlags.ExchangeAvailable]
                                ? null
                                : (
                                    <span> {t("or_create")} <span
                                        className='text-blue-400 hover:cursor-pointer hover:underline'
                                        onClick={() => navigate(`/exchange?${withdraw ? 'from' : 'to'}=${$const}`)}
                                    >
                        {withdraw ? t("sell") : t("buy")} {t("order")}
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
                                listHeight={md?200:500}
                    />}
            </div>
        </div>

        {noteVisible && <div className="row mb-10">
            <div className="col">
                <div className="info-box-note mb-10">
                    <div className="row mb-3">
                        <div className="col">
                            <span className="text-red-800">{t("please_note")}</span>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col">
                            <span
                                className="text-gray-400 font-medium text-fs14 leading-6">{t("you_should_send_only")} <b>{$const}</b> {t("you_should_send_only_2")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>
}

export default ChoseNetwork;
