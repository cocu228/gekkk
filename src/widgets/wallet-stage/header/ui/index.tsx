import {IconCoin} from "@/shared/ui/icons/icon-coin";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import {getDescriptionText, EurgTooltipText, EurgDescriptionText} from "../module/description";
import {useContext} from "react";
import {CtxWalletCurrency} from "@/widgets/wallet-stage/top-up/model/context";

const WalletHeader = () => {

    const currency = useContext(CtxWalletCurrency)

    const isEURG: boolean = currency.const === 'EURG';

    return <>
        <div className='grid grid-flow-col w-inherit py-6 items-start justify-between gap-10'>
            <div className="grid grid-flow-col justify-start gap-5">
                <div className="grid auto-cols-max">
                    <IconCoin code={currency.const}/>
                </div>
                <div className="flex flex-col content-around">
                    <div data-text={"Wallet balance"} className="text-sm font-medium text-gray-400 ellipsis">
                           <span>
                               Wallet balance
                           </span>
                    </div>

                    <div className="text-2xl font-bold text-gray-600 cursor-help">
                        {currency.const}
                    </div>
                </div>

                {isEURG && (<div className='grid auto-cols-fr'>
                    <div className="text-sm font-medium text-semilight">
                        Rate
                        <Tooltip text={EurgTooltipText}>
                            <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                            </div>
                        </Tooltip>
                    </div>

                    <div data-text={"3% per annum"} className='text-gray-600 text-2xl ellipsis'>
                        <span>3% per annum</span>
                    </div>
                </div>)}
            </div>

            <div className="text-right grid auto-cols-fr">
                <div data-text={`${currency.name} wallet`} className="mb-4 ellipsis -mt-1.5">
                    <span className="font-bold text-fs32 leading-1 text-gray-600">
                        {currency.name} wallet
                    </span>
                </div>
                <div className="max-w-[450px] font-medium text-sm text-gray-400 whitespace-pre-line">
                    {isEURG ? EurgDescriptionText :
                        getDescriptionText(currency.name, currency.const, currency.defaultInfoToken.flags)}
                </div>
            </div>
        </div>
    </>
}


export default WalletHeader