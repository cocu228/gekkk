import descriptions from '@/shared/config/coins/descriptions'
import Button from '@/shared/ui/button/Button';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import InlineProperty from "@/shared/ui/inline-property";
import InputCurrency from "@/shared/ui/input-currency";

const NoFeeProgram = () => {

    const currency = useContext(CtxWalletData);
    const {xl, md} = useContext(BreakpointsContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-warning">
                        <p className="font-extrabold text-sm mb-3">Locking {currency.currency} tokens gives you access
                            to the no fee
                            crypto-fiat
                            transactions</p>
                        <p className="text-sm">Up to the amount not exceeding a similar number of
                            blocked {currency.currency} tokens.
                            Funds are
                            blocked for 90
                            days.</p>
                    </div>
                </div>
            </div>
            <div className="row mb-6">
                <div className="col bg-[#F9F9FA] px-6 py-5">
                    <div className="row flex flex-wrap mb-4">
                        <div data-text={"Locked funds"}
                             className="col w-1/3  flex flex-row items-center justify-center ellipsis">
                            <img className="mr-2" width={24} height={24} src="/img/icon/replenishment.svg"
                                 alt="replenishment"/>
                            <span className="text-gray-400 text-sm">Locked funds</span>
                        </div>
                        <div className="col w-1/3 flex flex-row items-center  justify-center">
                            <img className="mr-2" width={24} height={24} src="/img/icon/DepositStartingRateIcon.svg"
                                 alt="DepositStartingRateIcon"/>
                            <span className="text-gray-400 text-sm">Used</span>
                        </div>
                        <div data-text={"Available for use"}
                             className="col w-1/3  flex flex-row items-center justify-center ellipsis">
                            <img className="mr-2" width={24} height={24} src="/img/icon/DepositCurrentIncomeIcon.svg"
                                 alt="DepositCurrentIncomeIcon"/>
                            <span className="text-gray-400 text-sm">
                                Available for use
                            </span>
                        </div>
                    </div>
                    <div className="row flex gap-1">
                        <div className="col w-1/3  flex flex-row items-center  justify-center">
                            <span className="text-lg font-bold">0</span>
                        </div>
                        <div className="col w-1/3  flex flex-row items-center justify-center">
                            <span className="text-lg font-bold">0</span>
                        </div>
                        <div className="col w-1/3  flex flex-row items-center justify-center">
                            <span className="text-lg font-bold text-green">0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row flex flex-wrap mb-6">
                <div
                    className="col -md:border-r-1 -md:border-solid -md:border-gray-400 md:mb-5 -md:pr-10 md:w-full w-3/5">
                    <div className="row mb-2">
                        <div className="col"><InlineProperty left={"Start of program"} right={"31/01/23 at 16:04"}/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col"><InlineProperty left={"Term"} right={"90 days"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><InlineProperty left={"Until"} right={"01/05/23 at 16:04"}/>
                        </div>
                    </div>

                </div>
                <div className="col md:w-full w-2/5 -md:pl-5 md:flex md:justify-center">
                    <p className="text-fs12 text-gray-500 text-center leading-4 md:text-center md:max-w-[280px]">At the
                        end of the program term, the
                        blocked {currency.currency} funds will return to your account</p>
                </div>
            </div>
            <div className="row mb-7">
                <div className="col">
                    <InputCurrency header={"Lock funds"} onChange={() => null} value={null} currencyData={currency}/>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <Button className="w-full" size={"xl"}>Lock {currency.currency} tokens</Button>
                </div>
            </div>
            <div className="row">
                <div className="col flex justify-center">
                    <span className="text-fs12 text-gray-500 text-center leading-4">The period of locking tokens is one calendar month. Start and end dates of the program will be updated</span>
                </div>
            </div>
        </>
    );
};

export default NoFeeProgram;
