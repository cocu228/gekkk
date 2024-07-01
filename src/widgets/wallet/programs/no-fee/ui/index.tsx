import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from '@/shared/ui/button/Button';
import useModal from "@/shared/model/hooks/useModal";
import InlineProperty from "@/shared/ui/inline-property";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {apiCreateInvestment, apiGetInvestments} from "@/shared/(orval)api/gek";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {useTranslation} from 'react-i18next';
import {CtxRootData} from "@/processes/RootContext";
import {GetDepositOut} from "@/shared/(orval)api/gek/model";
import { uncoverArray } from "@/shared/lib";
import { Modal } from "@/shared/ui/modal/Modal";

const NoFeeProgram = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const lockConfirmModal = useModal();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const {inputCurr, setInputCurr} = useInputState();
    const [investment, setInvestment] = useState<GetDepositOut>(null);
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();

    useEffect(() => {
        (async () => {
            const {data} = await apiGetInvestments({
                end: null,
                start: null,
                investment_types: [4]
            });
    
            setInvestment(uncoverArray(data.result));
        })();
    }, [account])

    return (
        <div className="md:bg-white md:rounded-[8px] md:p-2">
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-warning">
                        <p className="font-extrabold text-sm mb-3">
                            {t("locking_tokens_gives", {currency: currency.$const})}
                        </p>

                        <p className="text-sm">
                            {t("up_amount_not_exceeding_similar", {currency: currency.$const})} {t("funds_are_blocked_for", {days: 90})}
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mb-6">
                <div className="col bg-[#F9F9FA] md:bg-white px-6 py-5">
                    <div className="row flex flex-wrap mb-4">
                        <div className="col w-1/3  flex flex-row items-center justify-center">
                            <img
                                className="mr-2"
                                width={24} height={24}
                                alt="replenishment"
                                src="/img/icon/replenishment.svg"
                            />

                            <span className="text-gray-400 text-sm">{t("locked_funds")}</span>
                        </div>

                        <div className="col w-1/3 flex flex-row items-center  justify-center">
                            <img
                                className="mr-2"
                                width={24} height={24}
                                alt="DepositStartingRateIcon"
                                src="/img/icon/DepositStartingRateIcon.svg"
                            />

                            <span className="text-gray-400 text-sm">{t("used").capitalize()}</span>
                        </div>

                        <div className="col w-1/3  flex flex-row items-center justify-center">
                            <img
                                className="mr-2"
                                width={24} height={24}
                                src="/img/icon/DepositCurrentIncomeIcon.svg"
                                alt="DepositCurrentIncomeIcon"
                            />

                            <span className="text-gray-400 text-sm">{t("available_for_use")}</span>
                        </div>
                    </div>

                    <div className="row flex gap-1">
                        <div className="col w-1/3  flex flex-row items-center gap-1 justify-center">
                            <span className="text-lg font-bold">{investment?.amount ?? 0}</span>
                            <span className="text-lg text-green font-bold">{!inputCurr.value.string ? null : (
                                `(+${inputCurr.value.string})`
                            )}</span>
                        </div>

                        <div className="col w-1/3  flex flex-row items-center justify-center">
                            <span className="text-lg font-bold">{investment?.cur_amount ?? 0}</span>
                        </div>

                        <div className="col w-1/3  flex flex-row items-center justify-center">
                            <span className="text-lg font-bold text-green">{investment
                                ? investment.amount - investment.cur_amount
                                : 0
                            }</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row flex flex-wrap mb-6">
                <div className="col -md:border-r-1 -md:border-solid -md:border-gray-400 md:mb-5 -md:pr-10 md:w-full w-3/5">
                    <NoFeeProperties
                        endDate={investment?.date_end ?? new Date()}
                        startDate={investment?.date_start ?? new Date()}
                        templateTerm={90}
                        t={t}
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
                        value={inputCurr.value.number}
                        onError={setInputCurrValid}
                        description={`${t("minimum_lock_amount")} 100 ${currency.$const}`}
                        validators={[
                            validateBalance(currency, navigate, t),
                            validateMinimumAmount(100, inputCurr.value.number, currency.$const, t)
                        ]}
                    >
                        <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                       header={<span className='text-gray-600'>{t("amount")}:</span>}
                                                       currency={currency}>
                            <InputCurrency.DisplayBalance currency={currency}>
                                <InputCurrency
                                    placeholder={t("exchange.enter_amount")}
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
                <div className="flex justify-center col">
                    <Button
                        size="lg"
                        disabled={inputCurrValid.value}
                        onClick={lockConfirmModal.showModal}
                        className="w-full"
                        >{t("lock_tokens", {currency: currency.$const})}
                    </Button>
                </div>
            </div>

            <div className="row">
                <div className="col flex justify-center">
                    <span className="text-fs12 text-gray-500 text-center leading-4">
                        {t("period_of_locking_tokens", {days: 90})}
                    </span>
                </div>
            </div>
            
            <Modal
                title={t("confirm_locking")}
                isModalOpen={lockConfirmModal.isModalOpen}
                onCancel={lockConfirmModal.handleCancel}
            >
                <div className="mb-2">
                    <NoFeeProperties
                        endDate={investment?.date_end ?? new Date()}
                        startDate={investment?.date_start ?? new Date()}
                        templateTerm={90}
                        t={t}
                    />
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <InlineProperty
                            left={t("amount")}
                            right={<>
                                {investment?.amount} {!inputCurr.value.string ? null : (
                                    (<span className="text-green">+({inputCurr.value.string})</span>)
                                )} {currency.$const}
                            </>}
                        />
                    </div>
                </div>
                
                <div className="mt-6 md:mt-12 flex justify-center">
                    <Button
                        size="lg"
                        className="w-full"
                        disabled={inputCurrValid.value}
                        onClick={async () => {
                            setInputCurr('');
                            lockConfirmModal.handleCancel();
                            const {data} = await apiCreateInvestment({
                                amount: inputCurr.value.number,
                                term_days: 90,
                                depo_template_type: 4
                            });

                            if (data.result != null) {
                                setInvestment(data.result);
                            }
                        }}
                    >{t("confirm")}</Button>
                </div>
            </Modal>
        </div>
    );
};

function NoFeeProperties({
    endDate,
    startDate,
    templateTerm,
    t
}) {
    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={t("start_of_program")} right={formatForCustomer(startDate)}/>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={t("term")} right={`${templateTerm} ${t("days")}`}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty left={t("until")} right={formatForCustomer(endDate)}/>
                </div>
            </div>
        </>
    )
}

export default NoFeeProgram;
