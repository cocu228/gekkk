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
import styles from './styles.module.scss'
import { IconApp } from "@/shared/ui/icons/icon-app";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const NoFeeProgram = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const lockConfirmModal = useModal();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const {inputCurr, setInputCurr} = useInputState();
    const [investment, setInvestment] = useState<GetDepositOut>(null);
    const {inputCurrValid, setInputCurrValid} = useInputValidateState();
    const {md} = useBreakpoints()

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
        <div className=" md:mx-[-10px]">
            <div className="bg-[#fff] md:p-[5px_20px] md:rounded-[8px]">
                <div className="row mb-[10px]">
                    <div className={`${styles.InfoBoxDescription} text-[#3a5e66]`}>
                        <p className="font-extrabold text-sm mb-3 leading-[18px]">
                            {t("locking_tokens_gives", {currency: currency.$const})}
                        </p>

                        <ul className={styles.InfoBoxList}>
                            <li>{t("up_amount_not_exceeding_similar", {currency: currency.$const})}</li>
                            <li>{t("funds_are_blocked_for", {days: 90})}</li>
                        </ul>
                    </div>
                </div>

                {
                    !md && (
                        <div className={styles.Table}>
                            <div className={styles.TableItem}>
                                <div className={styles.TableItemGroup}>
                                    <IconApp code="t87" size={16} color='#285E69' className="min-w-[16px]" />
                                    {t("locked_funds")}
                                </div>
                                <span className={styles.TableItemText}>{investment ? investment.amount - investment.cur_amount : 0}</span>
                            </div>
                            <div className={styles.TableItem}>
                                <div className={`${styles.TableItemGroup} capitalize`}>
                                    <IconApp code="t86" size={16} color='#285E69' className="min-w-[16px]" />
                                    {t("used")}
                                </div>
                                <span className={styles.TableItemText}>{investment?.cur_amount ?? 0}</span>
                            </div>
                            <div className={styles.TableItem}>
                                <div className={styles.TableItemGroup}>
                                    <IconApp code="t88" size={16} color='#285E69' className="min-w-[16px]" />
                                    {t("available_for_use")}
                                </div>
                                <span className={styles.TableItemText}>{investment ? investment.amount - investment.cur_amount: 0}</span>
                            </div>
                        </div>
                    )
                }

                <div className={styles.NoFeeTable}>
                    <div className={`w-full -md:w-[50%] ${styles.NoFeeTableProperties}`}>
                        <NoFeeProperties
                            endDate={investment?.date_end ?? new Date()}
                            startDate={investment?.date_start ?? new Date()}
                            templateTerm={90}
                            t={t}
                        />
                    </div>
                    <div className={styles.AtTheEndText}>
                        {t("end_of_the_program_term", {currency: currency.$const})} 
                    </div>
                </div>
            </div>

            {
                md && (
                    <div className={styles.Table}>
                        <div className={styles.TableItem}>
                                <div className={styles.TableItemGroup}>
                                    <IconApp code="t87" size={16} color='#285E69' className="min-w-[16px]" />
                                    {t("locked_funds")}
                                </div>
                                <span className={styles.TableItemText}>{investment ? investment.amount - investment.cur_amount : 0}</span>
                            </div>
                            <div className={styles.TableItem}>
                                <div className={`${styles.TableItemGroup} capitalize`}>
                                    <IconApp code="t86" size={16} color='#285E69' className="min-w-[16px]" />
                                    {t("used")}
                                </div>
                                <span className={styles.TableItemText}>{investment?.cur_amount ?? 0}</span>
                            </div>
                            <div className={styles.TableItem}>
                                <div className={styles.TableItemGroup}>
                                    <IconApp code="t88" size={16} color='#285E69' className="min-w-[16px]" />
                                    {t("available_for_use")}
                                </div>
                                <span className={styles.TableItemText}>{investment ? investment.amount - investment.cur_amount: 0}</span>
                            </div>
                    </div>
                )
            }

            <div className="row mb-7 -md:mt-[20px] md:bg-[#fff] md:p-[20px_13px_5px_13px] mt-[10px] md:rounded-[8px]">
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
                                                       header={<span className='ml-[7px] font-semibold text-[#1F3446]'>{t("amount")}:</span>}
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
                <div className="mt-[25px]">
                    <div className="flex justify-center col">
                        <Button
                            size="lg"
                            disabled={inputCurrValid.value}
                            onClick={lockConfirmModal.showModal}
                            className="w-full"
                            >{t("lock_tokens", {currency: currency.$const})}
                        </Button>
                    </div>
                    <span className="text-fs12 block mt-[20px] text-gray-500 text-center leading-4">
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
