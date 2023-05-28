import descriptions from '@/shared/config/coins/descriptions'
import Button from '@/shared/ui/button/Button';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import InlineProperty from "@/shared/ui/inline-property";
import InputCurrency from "@/shared/ui/input-currency";

const CashbackProgram = () => {

    const currency = useContext(CtxWalletData);
    const {xl, md} = useContext(BreakpointsContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-description">
                        <div className="row mb-3">
                            <div className="col">
                                <p className="font-extrabold text-sm">Locking {currency.currency} tokens gives you
                                    access to the
                                    cashback
                                    of 1% on Gekkard card spending, on
                                    monthly turnover in euros</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col flex">
                                <img className="mr-2" width={20} height={12} src="/img/icon/RightWitheArrowIcon.svg"
                                     alt="RightWitheArrowIcon"/>
                                <p className="text-sm">
                                    up to the amount not exceeding a similar number of
                                    blocked {currency.currency} tokens


                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col flex">
                                <img className="mr-2" width={20} height={12} src="/img/icon/RightWitheArrowIcon.svg"
                                     alt="RightWitheArrowIcon"/>
                                <p className="text-sm">
                                    cashback is credited once a month at the end of the billing period
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row flex flex-wrap mb-6">
                <div
                    className="col -md:border-r-1 md:mb-5 -md:border-solid -md:border-gray-400 -md:pr-10 md:w-full w-3/5">
                    <div className="row mb-2">
                        <div className="col"><InlineProperty left={"Start date"} right={"31/01/23 at 16:04"}/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col"><InlineProperty left={"Term"} right={"90 days"}/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col"><InlineProperty left={"End date"} right={"01/05/23 at 16:04"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><InlineProperty left={"Locked funds"} right={"01/05/23 at 16:04"}/>
                        </div>
                    </div>

                </div>
                <div className="col md:w-full w-2/5 -md:pl-5 md:flex md:justify-center">
                    <p className="text-fs12 text-gray-500 text-center leading-4 md:text-center md:max-w-[280px]">At the
                        end of the program term, the blocked {currency.currency} funds will return to your account</p>
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
                    <span className="text-fs12 text-gray-500 text-center leading-4">The period of locking tokens is 90 days. At the end of this period the funds will return to your account.</span>
                </div>
            </div>
        </>
    );
};

export default CashbackProgram;
