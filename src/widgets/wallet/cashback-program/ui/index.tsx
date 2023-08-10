import {addDays} from "date-fns";
import {useContext, useState} from "react";
import Modal from '@/shared/ui/modal/Modal';
import {useNavigate} from "react-router-dom";
import Button from '@/shared/ui/button/Button';
import {CtxRootData} from "@/processes/RootContext";
import useModal from '@/shared/model/hooks/useModal';
import InlineProperty from "@/shared/ui/inline-property";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {validateBalance, validateMaximumAmount, validateMinimumAmount} from "@/shared/config/validators";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {storeInvestments} from "@/shared/store/investments/investments";
import {apiCreateInvestment} from '@/shared/api/invest/create-investment';
import {storeInvestTemplates} from "@/shared/store/invest-templates/investTemplates";

const CashbackProgram = () => {
    const navigate = useNavigate();
    const lockConfirmModal = useModal();
    const currency = useContext(CtxWalletData);
    const {currencies} = useContext(CtxRootData);
    const [amount, setAmount] = useState<string>('');
    const investment = storeInvestments(state => state.cashbackInvestment);
    const [hasValidationError, setHasValidationError] = useState<boolean>(false);
    const cashbackTemplate = storeInvestTemplates(state => state.cashbackTemplate);
    const updateCashbackInvestment = storeInvestments(state => state.updateCashbackInvestment);

    return (
        <>
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-description">
                        <div className="row mb-3">
                            <div className="col">
                                <p className="font-extrabold text-sm">
                                    Locking {currency.$const} tokens gives you
                                    access to the cashback of 1% on Gekkard card spending,
                                    on monthly turnover in euros
                                </p>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col flex">
                                <img
                                    className="mr-2"
                                    width={20} height={12}
                                    alt="RightWitheArrowIcon"
                                    src="/img/icon/RightWitheArrowIcon.svg"
                                />

                                <p className="text-sm">
                                    up to the amount not exceeding a similar number of
                                    blocked {currency.$const} tokens
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col flex">
                                <img
                                    className="mr-2"
                                    width={20} height={12}
                                    alt="RightWitheArrowIcon"
                                    src="/img/icon/RightWitheArrowIcon.svg"
                                />

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
                        locked={investment?.amount ?? 0}
                        amount={amount}
                        endDate={investment?.date_end}
                        startDate={investment?.date_start}
                        currency={currency.$const}
                        templateTerm={cashbackTemplate.depo_min_time}
                    />
                </div>

                <div className="col md:w-full w-2/5 -md:pl-5 md:flex md:justify-center">
                    <p className="text-fs12 text-gray-500 text-center leading-4 md:text-center md:max-w-[280px]">
                        At the end of the program term, the
                        blocked {currency.$const} funds will
                        return to your account
                    </p>
                </div>
            </div>

            <div className="row mb-7">
                <div className="col">
                    <InputCurrency.Validator
                        className='text-sm'
                        value={amount}
                        onError={setHasValidationError}
                        description={`Minimum order amount is ${currencies.get(currency.$const)?.minOrder} ${currency.$const}`}
                        validators={[
                            validateBalance(currencies.get(currency.$const), navigate),
                            validateMinimumAmount(cashbackTemplate.depo_min_sum),
                            validateMaximumAmount(cashbackTemplate.depo_max_sum)
                        ]}
                    >
                        <InputCurrency.PercentSelector
                            onSelect={setAmount}
                            currency={currencies.get(currency.$const)}
                            header={<span className='font-medium text-md lg:text-sm md:text-xs select-none'>
                                Pay from
                            </span>}
                        >
                            <InputCurrency.DisplayBalance currency={currencies.get(currency.$const)}>
                                <InputCurrency
                                    value={amount}
                                    currency={currency.$const}
                                    onChange={v => setAmount(v)}
                                />
                            </InputCurrency.DisplayBalance>        
                        </InputCurrency.PercentSelector>
                    </InputCurrency.Validator>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <Button
                        disabled={!amount.length || hasValidationError}
                        onClick={lockConfirmModal.showModal}
                        className="w-full"
                        size={"xl"}
                    >
                        Lock {currency.$const} tokens
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col flex justify-center">
                    <span className="text-fs12 text-gray-500 text-center leading-4">
                        The period of locking tokens is {cashbackTemplate.depo_min_time} days.
                        At the end of this period the funds will return to your account.
                    </span>
                </div>
            </div>

            <Modal
                width={400}
                title="Confirm locking"
                open={lockConfirmModal.isModalOpen}
                onCancel={lockConfirmModal.handleCancel}
            >
                <CashbackProperties
                    locked={investment?.amount ?? 0}
                    amount={amount}
                    startDate={investment?.date_start ?? new Date()}
                    currency={currency.$const}
                    templateTerm={cashbackTemplate.depo_min_time}
                    endDate={addDays(new Date(), cashbackTemplate.depo_min_time)}
                />

                <div className="mt-6 md:mt-12">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={async () => {
                            setAmount('');
                            lockConfirmModal.handleCancel();
                            const {data} = await apiCreateInvestment({
                                amount: +amount,
                                term_days: cashbackTemplate.depo_min_time,
                                templateType: 3
                            });

                            if (data.result != null) updateCashbackInvestment(data.result)
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
    endDate,
    currency,
    startDate,
    templateTerm
}) {
    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={"Start date"} right={!startDate ? '-' : formatForCustomer(startDate)}/>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={"Term"} right={`${templateTerm} days`}/>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={"End date"} right={!endDate ? '-' : formatForCustomer(endDate)}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty
                        left={"Locked funds"}
                        right={<>
                            {locked} {!amount ? null : (
                                (<span className="text-green">+({amount})</span>)
                            )} {currency}
                        </>}
                    />
                </div>
            </div>
        </>
    )
}

export default CashbackProgram;
