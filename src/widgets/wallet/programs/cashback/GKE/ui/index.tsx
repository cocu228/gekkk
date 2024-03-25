import {addDays} from "date-fns";
import {useContext, useEffect, useState} from "react";
import Modal from '@/shared/ui/modal/Modal';
import {useNavigate} from "react-router-dom";
import Button from '@/shared/ui/button/Button';
import useModal from '@/shared/model/hooks/useModal';
import InlineProperty from "@/shared/ui/inline-property";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {apiCreateInvestment, apiGetInvestments} from '@/shared/(orval)api/gek';
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from "react-i18next";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import {uncoverArray} from "@/shared/lib";
import {GetDepositOut} from "@/shared/(orval)api/gek/model";

const GkeCashbackProgram = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const lockConfirmModal = useModal();
    const currency = useContext(CtxWalletData);
    const {account} = useContext(CtxRootData);
    const {currencies} = useContext(CtxCurrencies);
    const {inputCurr, setInputCurr} = useInputState();
    const [investment, setInvestment] = useState<GetDepositOut>(null);
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();

    useEffect(() => {
        (async () => {
            const {data} = await apiGetInvestments({
                end: null,
                start: null,
                investment_types: [3]
            });

            setInvestment(uncoverArray(data.result));
        })();
    }, [account]);

    return !currencies ? <Loader/> : (
        <>
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-description info-box-in-wallet">
                        <div className="row mb-3">
                            <div className="col">
                                <p className="font-extrabold text-sm">
                                    {t("locked_tokens_give_you_access", {currency: currency.$const})}
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
                                    {t("up_amount_not_exceeding_similar", {currency: currency.$const})}
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
                                    {t("cashback_is_credited_once_a_month")}
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
                        amount={inputCurr.value.number}
                        endDate={investment?.date_end}
                        startDate={investment?.date_start}
                        currency={currency.$const}
                        templateTerm={30}
                    />
                </div>

                <div className="col md:w-full w-2/5 -md:pl-5 md:flex md:justify-center">
                    <p className="text-fs12 text-gray-500 text-center leading-4 md:text-center md:max-w-[280px]">
                        {t("end_of_the_program_term", {currency: currency.$const})}
                    </p>
                </div>
            </div>

            <div className="row mb-7">
                <div className="col">
                    <InputCurrency.Validator
                        className='text-sm'
                        value={inputCurr.value.number}
                        onError={setInputCurrValid}
                        description={t("minimum_order_amount", {amount: 100 + " " + currency.$const})}
                        validators={[
                            validateBalance(currencies.get(currency.$const), navigate, t),
                            validateMinimumAmount(100, inputCurr.value.number, currency.$const, t)
                        ]}
                    >
                        <InputCurrency.PercentSelector
                            onSelect={setInputCurr}
                            currency={currencies.get(currency.$const)}
                            header={<span className='font-medium text-md lg:text-sm md:text-xs select-none'>
                                {t("exchange.pay_from")}
                            </span>}
                        >
                            <InputCurrency.DisplayBalance currency={currencies.get(currency.$const)}>
                                <InputCurrency
                                    value={inputCurr.value.string}
                                    currency={currency.$const}
                                    onChange={setInputCurr}
                                />
                            </InputCurrency.DisplayBalance>        
                        </InputCurrency.PercentSelector>
                    </InputCurrency.Validator>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col">
                    <Button
                        disabled={inputCurrValid.value}
                        onClick={lockConfirmModal.showModal}
                        className="w-full"
                        size={"xl"}
                    >
                        {t("lock_tokens", {currency: currency.$const})}
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col flex justify-center">
                    <span className="text-fs12 text-gray-500 text-center leading-4">
                        {t("period_of_locking_tokens_GKE", {days: 30})}
                    </span>
                </div>
            </div>

            <Modal
                width={400}
                title={t("confirm_locking")}
                open={lockConfirmModal.isModalOpen}
                onCancel={lockConfirmModal.handleCancel}
            >
                <CashbackProperties
                    locked={investment?.amount ?? 0}
                    amount={inputCurr.value.number}
                    startDate={investment?.date_start ?? new Date()}
                    currency={currency.$const}
                    templateTerm={30}
                    endDate={addDays(new Date(), 30)}
                />

                <div className="mt-6 md:mt-12">
                    <Button
                        size="xl"
                        className="w-full"
                        onClick={async () => {
                            setInputCurr("");
                            lockConfirmModal.handleCancel();
                            const {data} = await apiCreateInvestment({
                                amount: inputCurr.value.number,
                                term_days: 30,
                                depo_template_type: 3
                            });

                            if (data.result != null) {
                                setInvestment(data.result);
                            }
                        }}
                    >{t("confirm")}</Button>
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

    const {t} = useTranslation()

    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={t("start_date")} right={!startDate ? '-' : formatForCustomer(startDate)}/>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={t("term")} right={`${templateTerm} ${t("days")}`}/>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={t("end_date")} right={!endDate ? '-' : formatForCustomer(endDate)}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty
                        left={t("locked_funds")}
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

export default GkeCashbackProgram;
