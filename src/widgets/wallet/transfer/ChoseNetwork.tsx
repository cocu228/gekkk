import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import InfoBox from "@/widgets/info-box";
import {useNavigate} from "react-router-dom";
import Select from "@/shared/ui/select/Select";
import {CurrencyFlags} from "@/shared/config/mask-currency-flags";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {useTranslation} from "react-i18next";
import {isCryptoNetwork} from "@/widgets/wallet/transfer/model/helpers";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "./style.module.scss"
import { IconApp } from "@/shared/ui/icons/icon-app";

interface IProps{
    withdraw?: boolean,
    network?: number,
    setNetwork?: Dispatch<SetStateAction<number>>
}

const ChoseNetwork = ({withdraw = false, network, setNetwork}: IProps) => {
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

    

    
    return <div>
        <div className={styles.Container}>
            
                {(Array.isArray(networksForSelector) && networksForSelector.length < 2) ? null :
                    md ? <div className={styles.TypeTitle}> 
                        <span>
                            {t("type")}:
                        </span>
                    </div>
                    :
                        withdraw ? t("select_withdraw_network") + ":" : t("select_network") + ":"
                }

            <div className="col w-full overflow-hidden">
                {Array.isArray(networksForSelector) &&
                    networksForSelector.length === 0 ?
                        md ? <div className={styles.NoOptions}>
                            <div className={styles.Icon}>
                                <IconApp code="t27" color="var(--gek-orange)" size={15}/>
                            </div>
                            <span className={styles.NoOptionsText}>
                                {t("not_a_single_option_aviable", {do: withdraw ? t("to_withdraw") : t("top_up")})}
                                {!currencies.get($const).flags[CurrencyFlags.ExchangeAvailable]
                                    ? null
                                    : (<span> {t("or_create") + " "} 
                                            <span
                                                className='text-[var(--gek-green)] hover:cursor-pointer underline'
                                                onClick={() => navigate(`/exchange?${withdraw ? 'from' : 'to'}=${$const}`)}
                                            >
                                                {withdraw ? t("sell") : t("buy")} {t("order")}
                                            </span>.
                                        </span>
                                    )
                                }
                            </span>
                        </div>
                        :
                        <InfoBox
                            icon={<div className="flex justify-center w-full">
                                <IconApp code="t27" color="var(--gek-orange)" size={25}/>
                            </div>}
                            message={<span>
                                {t("not_a_single_option_aviable", {do: withdraw ? t("to_withdraw") : t("top_up")})}
                                {!currencies.get($const).flags[CurrencyFlags.ExchangeAvailable]
                                    ? null
                                    : (<span> {t("or_create")} 
                                            <span
                                                className='text-blue-400 hover:cursor-pointer hover:underline'
                                                onClick={() => navigate(`/exchange?${withdraw ? 'from' : 'to'}=${$const}`)}
                                            >
                                                {withdraw ? t("sell") : t("buy")} {t("order")}
                                            </span>.
                                        </span>
                                    )
                                }
                            </span>}
                        />
                    :
                        Array.isArray(networksForSelector) && networksForSelector.length === 1 
                        ?
                            <h3 className="mt-4 font-bold">{networksForSelector[0].label}</h3>
                        :
                            Array.isArray(networksForSelector) &&
                                md ? 
                                    <div
                                        className={styles.SelectBlock}
                                        onClick={() => {
                                            setNetwork(null)
                                            navigate(`/wallet?currency=${$const}&tab=top_up`)
                                        }}
                                    >
                                        <div
                                            className={`${styles.SelectActive} ${
                                                network && styles.SelectCurrencyActive
                                            }`}
                                        >
                                            <div className={styles.SelectPickedValue}>
                                                {!network ? (
                                                    <span className={styles.NonePickedTitle}>-{t("select")}-</span>
                                                ) : (
                                                    <span className={styles.SelectActiveToken}>
                                                        {[...networksForSelector].filter(el => el.value === network)[0]?.label}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={styles.SelectIconBlock}>
                                                <IconApp className="rotate-90" color="#fff" code="t08" size={12} />
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <Select 
                                        data-testid="network_selector" 
                                        className="w-full mt-2"
                                        placeholder={"Networks not found"} value={networkTypeSelect}
                                        onSelect={setNetworkType}
                                        options={networksForSelector}
                                        listHeight={md?200:500}
                                    />
                }
            </div>
        </div>

        {!md && noteVisible && <div className="row mb-10">
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
    </div>
}

export default ChoseNetwork;
