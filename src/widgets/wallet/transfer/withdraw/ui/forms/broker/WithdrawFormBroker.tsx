import React, {useCallback, useContext, useEffect, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import UseModal from "@/shared/model/hooks/useModal";
import {debounce} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {AccountRights} from '@/shared/config/account-rights';
import {validateBalance, validateMinimumAmount} from '@/shared/config/validators';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmBroker from "@/widgets/wallet/transfer/withdraw/ui/forms/broker/WithdrawConfirmBroker";
import Decimal from "decimal.js";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";


const WithdrawFormBroker = () => {

    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);

    const {networkIdSelect, networksDefault, setNetworkId, setRefresh} = useContext(CtxWalletNetworks);

    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()

    const [loading, setLoading] = useState(false);
    const {isModalOpen, showModal, handleCancel} = UseModal();

    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);
    const delayDisplay = useCallback(debounce(() => setLoading(false), 2700), []);

    const {
        min_withdraw = 0,
        withdraw_fee = 0,
        percent_fee = 0
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    useEffect(() => {

        setLoading(true)
        delayRes(inputCurr.value.number)
        delayDisplay()

    }, [inputCurr.value.number]);

    return (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>

            <div className="col text-xs">
                <span><b>Note</b>:  Standard exchange fee is <b>{percent_fee}%</b>
                    {account.rights[AccountRights.IsJuridical] ? null :
                        <span className="font-normal"> If you <span
                            className='text-blue-400 hover:cursor-pointer hover:underline'
                            onClick={() => navigate('/wallet/GKE/No Fee Program')}
                        >
                            freeze GKE tokens    
                        </span> fee is <b>0%</b>.
                    </span>}
                </span>
            </div>
        </div>

        <div className="row mb-4">
            <div className="col">
                <InputCurrency.Validator
                    value={inputCurr.value.number}
                    onError={setInputCurrValid}
                    description={getWithdrawDesc(min_withdraw, currency.$const)}
                    validators={[
                        validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const),
                        validateBalance(currency, navigate)]}>
                    <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                   header={<span className='text-gray-600 font-medium'>You will pay</span>}
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
        <div className="row">
            <div className="col">
                <div className="row flex gap-4 text-gray-400 font-medium mb-14 mt-6 text-sm">
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row">
                            <span>You will pay</span>
                        </div>
                        <div className="row">
                        <span>
                          You will get
                        </span>
                        </div>
                        <div className="row">
                            <span>
                          Fee
                        </span>
                        </div>
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{inputCurr.value.number} {currency.$const}</span>
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()} {currency.$const}G</span>}
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(withdraw_fee).toString()} {currency.$const}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title={"Withdraw confirmation"}
        >
            <WithdrawConfirmBroker amount={inputCurr.value.number} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full mt-4">
            <div className="col">
                <Button
                    size={"xl"}
                    disabled={!inputCurr.value.number || inputCurrValid.value || loading}
                    onClick={showModal}
                    className="w-full"
                >
                    Sell EURG
                </Button>
            </div>
        </div>
    </div>)
};

export default WithdrawFormBroker;
