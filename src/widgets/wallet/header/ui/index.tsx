import {useContext} from "react";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import {CtxRootData} from "@/processes/RootContext";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import BankCardsCarousel from "@/features/bank-cards-carousel/ui/BankCardsCarousel";
import {EurgTooltipText, EurgDescriptionText, GkeTooltipText} from "../module/description";
import { useTranslation } from 'react-i18next';


const getDescription = (c, name, t) => {
    if (c === "BTC" || c === "ETH" || c === "XMR") {
        return `${t("top_up_send_buy_sell")} ${name} (${c}) ${t("directly_from")}`
    } else {
        return `${t("buy_and_sell")} ${name} (${c}) ${t("directly_from")}`
    }
}

const WalletHeader = () => {
    const {t} = useTranslation();
    const {account} = useContext(CtxRootData);
    const {md} = useContext(BreakpointsContext);
    const {
        name,
        $const,
        availableBalance,
        lockInBalance,
        lockOutBalance,
        roundPrec,
        lockOrders
    } = useContext(CtxWalletData);

    const isEURG: boolean = $const === 'EURG';
    const isEUR: boolean = $const === 'EUR';
    const isGKE: boolean = $const === 'GKE';

    return <>
        <div className='grid grid-flow-col w-inherit py-6 items-start justify-between gap-10'>
            <div className="grid grid-flow-col justify-start gap-5">
                <div className="grid auto-cols-max">
                    <IconCoin code={$const}/>
                </div>
                {!md && <div className="flex flex-col content-around">
                    {!isEUR ? (
                        <div data-text={t("wallet_balance")} className="text-sm font-medium text-gray-400 ellipsis">
                            <span>
                                {t("wallet_balance")}
                            </span>
                        </div>
                    ) : (
                        <div className='grid auto-cols-fr'>
                            <span data-text={account.number} className="text-sm overflow-ellipsis font-medium text-gray-400 ellipsis">
                               {t("account")}: {account.number}
                            </span>
                        </div>
                    )}

                    <div className="text-2xl font-bold text-gray-600">
                        {availableBalance === null ? '-' : availableBalance.toNumber()} {isEUR ? '€': $const=='BTC'? '₿': $const}
                    </div>
                    
                    <g className="text-gray-400 text-sm">
                        {!lockInBalance ? null : <div>{t("locked_in")}: {lockInBalance.toFixed(roundPrec)}</div>}
                        {!lockOutBalance ? null : <div>{t("locked_out")}: {lockOutBalance.toFixed(roundPrec)}</div>}
                        {!lockOrders ? null : <div>{t("locked_orders")}: {lockOrders.toFixed(roundPrec)}</div>}
                    </g>
                </div>}
                {md && <div className="flex flex-col content-around">
                    <div className="text-sm font-medium text-gray-400">
                           <span>
                              {name} {t("wallet")}
                           </span>
                    </div>
                    
                    <div className="text-2xl font-bold text-gray-600">
                        {!availableBalance ? 0 : availableBalance.toNumber()} {isEUR ? '€': $const=='BTC'? '₿': $const}
                    </div>

                    <g className="text-gray-400 text-sm">
                        {!lockInBalance ? null : <div>{t("locked_in")}: {lockInBalance.toFixed(roundPrec)}</div>}
                        {!lockOutBalance ? null : <div>{t("locked_out")}: {lockOutBalance.toFixed(roundPrec)}</div>}
                        {!lockOrders ? null : <div>{t("locked_orders")}: {lockOrders.toFixed(roundPrec)}</div>}
                    </g>
                </div>}


                {(isEURG || isGKE) && !md && (<div className='flex flex-col auto-cols-fr ml-8'>
                    <div className="text-sm font-medium text-gray-400 text-semilight">
                        {t("rate")}
                        <Tooltip text={isEURG ? t("eurg_tooltip_text") : t("gke_tooltip_text")}>
                            <div className="inline-block relative align-middle w-[14px] pb-1 ml-1 mt-[1px] cursor-help">
                                <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                            </div>
                        </Tooltip>
                    </div>

                    <div className='text-gray-600 text-2xl'>
                        <span>{t("per_annum", {percent: isEURG ? 3 : 5})}</span>
                    </div>
                </div>)}
            </div>
            
            {/* {md ? null : isEUR ? (
                 <div/>
            ) : (
                <div className="text-right grid auto-cols-fr">
                    <div data-text={name} className="mb-3 ellipsis -mt-1.5">
                        <span className="font-bold text-fs32 leading-1 text-gray-600">
                           {isEURG ? "Gekkoin Europe " + t("wallet"): <>{name} {t("wallet")}</>}
                        </span>
                    </div>
                    <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                        {isEURG ? EurgDescriptionText : getDescription($const, name, t)}
                    </div>
                </div>
            )} */}
        </div>
    </>
}

export default WalletHeader;
