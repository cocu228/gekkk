import {addMonths} from "date-fns";
import {useContext, useState} from "react";
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import InputCurrency from "@/shared/ui/input-currency";
import InlineProperty from "@/shared/ui/inline-property";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import descriptions from '@/shared/config/coins/descriptions';
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {apiCreateInvestment} from '@/shared/api/invest/create-investment';

const CashbackProgram = () => {
    const [amount, setAmount] = useState<string>('');
    const wallet = useContext(CtxWalletData);
    const {xl, md} = useContext(BreakpointsContext);
    const lockConfirmModal = useModal();

    return (
        <>
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-description">
                        <div className="row mb-3">
                            <div className="col">
                                <p className="font-extrabold text-sm">Locking {wallet.currency} tokens gives you
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
                                    blocked {wallet.currency} tokens


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
                <div className="col -md:border-r-1 md:mb-5 -md:border-solid -md:border-gray-400 -md:pr-10 md:w-full w-3/5">
                    <CashbackProperties
                        locked={0}
                        amount={amount}
                        currency={wallet.currency}
                    />
                </div>
                <div className="col md:w-full w-2/5 -md:pl-5 md:flex md:justify-center">
                    <p className="text-fs12 text-gray-500 text-center leading-4 md:text-center md:max-w-[280px]">At the
                        end of the program term, the blocked {wallet.currency} funds will return to your account</p>
                </div>
            </div>
            
            <div className="row mb-7">
                <div className="col">
                    <InputCurrency
                        header={"Lock funds"}
                        onChange={setAmount}
                        value={amount ? amount : null}
                        currencyData={wallet}
                    />
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <Button
                        disabled={!amount.length}
                        onClick={lockConfirmModal.showModal}
                        className="w-full"
                        size={"xl"}
                    >
                        Lock {wallet.currency} tokens
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col flex justify-center">
                    <span className="text-fs12 text-gray-500 text-center leading-4">The period of locking tokens is 90 days. At the end of this period the funds will return to your account.</span>
                </div>
            </div>

            <Modal
                width={400}
                title="Confirm locking"
                open={lockConfirmModal.isModalOpen}
                onCancel={lockConfirmModal.handleCancel}
            >
                <CashbackProperties
                    locked={0}
                    amount={amount}
                    currency={wallet.currency}
                />
                
                <div className="mt-6 md:mt-12">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={() => {
                            lockConfirmModal.handleCancel();
                            apiCreateInvestment({
                                amount: +amount,
                                term_days: 30,
                                templateType: 3
                            });
                        }}
                    >Confirm</Button>
                </div>
            </Modal>
        </>
    );
};

function CashbackProperties({
    locked,
    amount,
    currency
}) {
    return (
        <>
            <div className="row mb-2">
                <div className="col"><InlineProperty left={"Start date"} right={formatForCustomer(Date())}/>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col"><InlineProperty left={"Term"} right={"30 days"}/>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col"><InlineProperty left={"End date"} right={formatForCustomer(addMonths(new Date(), 1))}/>
                </div>
            </div>
            <div className="row">
                <div className="col"><InlineProperty left={"Locked funds"} right={<>
                    {locked} {!amount ? null : (
                        (<span className="text-green">+({amount})</span>)
                    )} {currency}
                </>}/>
                </div>
            </div>
        </>
    )
}

export default CashbackProgram;
