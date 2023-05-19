import {useContext} from "react";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {EurgTooltipText, EurgDescriptionText} from "../module/description";

const getDescription = (c, name) => {
    if (c === "BTC" || c === "ETH" || c === "XMR") {
        return `Top up, Send, Buy and Sell your ${name} (${c}) directly from your Gekkoin account`
    } else {
        return `Buy and Sell your ${name} (${c}) directly from your Gekkoin account`
    }
}

const WalletHeader = () => {
    const {xl, md} = useContext(BreakpointsContext);
    const {
        name,
        currency,
        availableBalance
    } = useContext(CtxWalletData);
    const isEURG: boolean = currency === 'EURG';

    return <>
        <div className='grid grid-flow-col w-inherit py-6 items-start justify-between gap-10'>
            <div className="grid grid-flow-col justify-start gap-5">
                <div className="grid auto-cols-max">
                    <IconCoin code={currency}/>
                </div>
                {!md && <div className="flex flex-col content-around">
                    <div data-text={"Wallet balance"} className="text-sm font-medium text-gray-400 ellipsis">
                           <span>
                               Account balance
                           </span>
                    </div>

                    <div className="text-2xl font-bold text-gray-600 cursor-help">
                        {!availableBalance ? 0 : availableBalance.toNumber()} {currency}
                    </div>
                </div>}
                {md && <div className="flex flex-col content-around">
                    <div className="text-2xl font-bold text-gray-600 cursor-help">
                        {!availableBalance ? 0 : availableBalance.toNumber()} {currency}
                    </div>
                    <div data-text={"Wallet balance"} className="text-sm font-medium text-gray-400 ellipsis">
                           <span>
                              {name} wallet
                           </span>
                    </div>

                </div>}


                {isEURG && !md && (<div className='grid auto-cols-fr ml-8'>
                    <div className="text-sm font-medium text-gray-400 text-semilight">
                        Rate
                        <Tooltip text={EurgTooltipText}>
                            <div className="inline-block relative align-middle w-[14px] pb-1 ml-1 cursor-help">
                                <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                            </div>
                        </Tooltip>
                    </div>

                    <div data-text={"3% per annum"} className='text-gray-600 text-2xl ellipsis'>
                        <span>3% per annum</span>
                    </div>
                </div>)}
            </div>

            {!md && (
                <div className="text-right grid auto-cols-fr">
                    <div data-text={`${name} wallet`} className="mb-3 ellipsis -mt-1.5">
                        <span className="font-bold text-fs32 leading-1 text-gray-600">
                           {isEURG ? "Gekkoin Europe wallet" : <>{name} wallet</>}
                        </span>
                    </div>
                    <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                        {isEURG ? EurgDescriptionText : getDescription(currency, name)}
                    </div>
                </div>
            )}
        </div>
    </>
}

export default WalletHeader;
