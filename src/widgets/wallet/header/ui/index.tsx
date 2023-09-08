import {Carousel} from "antd";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import {CtxRootData} from "@/processes/RootContext";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useContext, useEffect, useState} from "react";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";
import {EurgTooltipText, EurgDescriptionText, GkeTooltipText} from "../module/description";

const getDescription = (c, name) => {
    if (c === "BTC" || c === "ETH" || c === "XMR") {
        return `Top up, Send, Buy and Sell your ${name} (${c}) directly from your Gekkoin account`
    } else {
        return `Buy and Sell your ${name} (${c}) directly from your Gekkoin account`
    }
}

const WalletHeader = () => {
    const {account} = useContext(CtxRootData);
    const {md} = useContext(BreakpointsContext);
    const bankCards = storeBankCards(state => state.bankCards);
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
                        <div data-text={"Wallet balance"} className="text-sm font-medium text-gray-400 ellipsis">
                            <span>
                                Wallet balance
                            </span>
                        </div>
                    ) : (
                        <span data-text={"Wallet balance"} className="text-sm overflow-ellipsis font-medium text-gray-400 ellipsis">
                            Account: {account.number}
                        </span>
                    )}

                    <div className="text-2xl font-bold text-gray-600 cursor-help">
                        {availableBalance === null ? '-' : availableBalance.toNumber()} {$const}
                    </div>
                    
                    <g className="text-gray-400 text-sm">
                        {!lockInBalance ? null : <div>Locked in: {lockInBalance.toFixed(roundPrec)}</div>}
                        {!lockOutBalance ? null : <div>Locked out: {lockOutBalance.toFixed(roundPrec)}</div>}
                        {!lockOrders ? null : <div>Locked orders: {lockOrders.toFixed(roundPrec)}</div>}
                    </g>
                </div>}
                {md && <div className="flex flex-col content-around">
                    <div data-text={"Wallet balance"} className="text-sm font-medium text-gray-400 ellipsis">
                           <span>
                              {name} wallet
                           </span>
                    </div>
                    
                    <div className="text-2xl font-bold text-gray-600 cursor-help">
                        {!availableBalance ? 0 : availableBalance.toNumber()} {$const}
                    </div>

                    <g className="text-gray-400 text-sm">
                        {!lockInBalance ? null : <div>Locked in: {lockInBalance.toFixed(roundPrec)}</div>}
                        {!lockOutBalance ? null : <div>Locked out: {lockOutBalance.toFixed(roundPrec)}</div>}
                        {!lockOrders ? null : <div>Locked orders: {lockOrders.toFixed(roundPrec)}</div>}
                    </g>
                </div>}


                {(isEURG || isGKE) && !md && (<div className='flex flex-col auto-cols-fr ml-8'>
                    <div className="text-sm font-medium text-gray-400 text-semilight">
                        Rate
                        <Tooltip text={isEURG ? EurgTooltipText : GkeTooltipText}>
                            <div className="inline-block relative align-middle w-[14px] pb-1 ml-1 mt-[1px] cursor-help">
                                <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                            </div>
                        </Tooltip>
                    </div>

                    <div data-text={`${isEURG ? 3 : 5}% per annum`} className='text-gray-600 text-2xl ellipsis'>
                        <span>{isEURG ? 3 : 5}% per annum</span>
                    </div>
                </div>)}
            </div>

            {md ? null : isEUR ? (
                <div className="h-[200px] w-[310px] -mt-16 mr-20 -xl:-mb-10 lg:scale-75 lg:mr-0">
                    <Carousel>
                        {!bankCards ? (
                            <SkeletonCard/>
                        ) : bankCards.map(c => (
                            <div className="scale-90 mb-5">
                                <BankCard
                                    className="hover:shadow-none"
                                    cardNumber={formatCardNumber(c.displayPan)}
                                    expiresAt={formatMonthYear(new Date(c.expiryDate))}
                                    holderName={c.cardholder}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div className="text-right grid auto-cols-fr">
                    <div data-text={`${name} wallet`} className="mb-3 ellipsis -mt-1.5">
                        <span className="font-bold text-fs32 leading-1 text-gray-600">
                           {isEURG ? "Gekkoin Europe wallet" : <>{name} wallet</>}
                        </span>
                    </div>
                    <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                        {isEURG ? EurgDescriptionText : getDescription($const, name)}
                    </div>
                </div>
            )}
        </div>
    </>
}

export default WalletHeader;
