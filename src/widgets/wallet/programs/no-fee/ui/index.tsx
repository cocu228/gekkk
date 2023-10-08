import {useContext, useState} from "react";
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from "react-router-dom";
import Button from '@/shared/ui/button/Button';
import {apiCreateInvestment} from "@/shared/api";
import useModal from "@/shared/model/hooks/useModal";
import InlineProperty from "@/shared/ui/inline-property";
import InputCurrency from "@/shared/ui/input-currency/ui";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import {storeInvestments} from "@/shared/store/investments/investments";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";

const NoFeeProgram = () => {
    const navigate = useNavigate();
    const lockConfirmModal = useModal();
    const currency = useContext(CtxWalletData);
    const {currencies} = useContext(CtxCurrencies);
    const [amount, setAmount] = useState<string>('');
    const investment = storeInvestments(state => state.noFeeInvestment);
    const updateNoFeeInvestment = storeInvestments(state => state.updateNoFeeInvestment);

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    return (
        <>
            <div className="row mb-10">
                <div className="col">
                    <div className="info-box-warning">
                        <p className="font-extrabold text-sm mb-3">
                            Locking {currency.$const} tokens gives you access
                            to the no fee crypto-fiat transactions
                        </p>

                        <p className="text-sm">
                            Up to the amount not exceeding a similar number of
                            blocked {currency.$const} tokens.
                            Funds are blocked for 90 days.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mb-6">
                <div className="col bg-[#F9F9FA] px-6 py-5">
                    <div className="row flex flex-wrap mb-4">
                        <div data-text={"Locked funds"} className="col w-1/3  flex flex-row items-center justify-center ellipsis">
                            <img
                                className="mr-2"
                                width={24} height={24}
                                alt="replenishment"
                                src="/img/icon/replenishment.svg"
                            />

                            <span className="text-gray-400 text-sm">Locked funds</span>
                        </div>

                        <div className="col w-1/3 flex flex-row items-center  justify-center">
                            <img
                                className="mr-2"
                                width={24} height={24}
                                alt="DepositStartingRateIcon"
                                src="/img/icon/DepositStartingRateIcon.svg"
                            />

                            <span className="text-gray-400 text-sm">Used</span>
                        </div>

                        <div data-text={"Available for use"} className="col w-1/3  flex flex-row items-center justify-center ellipsis">
                            <img
                                className="mr-2"
                                width={24} height={24}
                                src="/img/icon/DepositCurrentIncomeIcon.svg"
                                alt="DepositCurrentIncomeIcon"
                            />

                            <span className="text-gray-400 text-sm">Available for use</span>
                        </div>
                    </div>

                    <div className="row flex gap-1">
                        <div className="col w-1/3  flex flex-row items-center gap-1 justify-center">
                            <span className="text-lg font-bold">{investment?.amount ?? 0}</span>
                            <span className="text-lg text-green font-bold">{!amount ? null : (
                                `(+${+amount})`
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
                    />
                </div>

                <div className="col md:w-full w-2/5 -md:pl-5 md:flex md:justify-center">
                    <p className="text-fs12 text-gray-500 text-center leading-4 md:text-center md:max-w-[280px]">
                        At the end of the program term, the
                        blocked {currency.$const} funds will return to your account
                    </p>
                </div>
            </div>

            <div className="row mb-7">
                <div className="col">
                    <InputCurrency.Validator
                        value={inputCurr.value.number}
                        onError={setInputCurrValid}
                        description={`Minimum lock amount is 100 ${currency.$const}`}
                        validators={[
                            validateBalance(currencies.get(currency.$const), navigate),
                            validateMinimumAmount(100, inputCurr.value.number, currency.$const)
                        ]}
                    >
                        <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                       header={<span className='text-gray-600'>Amount</span>}
                                                       currency={currency}>
                            <InputCurrency.DisplayBalance currency={currency}>
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
                        disabled={!amount.length}
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
                        The period of locking tokens is 90 days. Start and end dates of the program will be updated
                    </span>
                </div>
            </div>
            
            <Modal
                width={400}
                title="Confirm locking"
                open={lockConfirmModal.isModalOpen}
                onCancel={lockConfirmModal.handleCancel}
            >
                <div className="mb-2">
                    <NoFeeProperties
                        endDate={investment?.date_end ?? new Date()}
                        startDate={investment?.date_start ?? new Date()}
                        templateTerm={90}
                    />
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <InlineProperty
                            left={"Amount"}
                            right={<>
                                {investment?.amount} {!amount ? null : (
                                    (<span className="text-green">+({amount})</span>)
                                )} {currency.$const}
                            </>}
                        />
                    </div>
                </div>
                
                <div className="mt-6 md:mt-12">
                    <Button
                        size="xl"
                        className="w-full"
                        disabled={inputCurrValid.value}
                        onClick={async () => {
                            setAmount('');
                            lockConfirmModal.handleCancel();
                            const {data} = await apiCreateInvestment({
                                amount: +amount,
                                term_days: 90,
                                templateType: 4
                            });

                            if (data.result != null) updateNoFeeInvestment(data.result)
                        }}
                    >Confirm</Button>
                </div>
            </Modal>
        </>
    );
};

function NoFeeProperties({
    endDate,
    startDate,
    templateTerm
}) {
    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={"Start of program"} right={formatForCustomer(startDate)}/>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <InlineProperty left={"Term"} right={`${templateTerm} days`}/>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InlineProperty left={"Until"} right={formatForCustomer(endDate)}/>
                </div>
            </div>
        </>
    )
}

export default NoFeeProgram;
