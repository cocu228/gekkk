import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Input from "@/shared/ui/input/Input";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {transferDescription} from "@/widgets/wallet/transfer/withdraw/model/transfer-description";
import WithdrawConfirmSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawConfirmSepa";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {useNavigate} from "react-router-dom";
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import Decimal from "decimal.js";

const WithdrawFormSepa = () => {

    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null,
        amount: null,
    })
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const {
        min_withdraw = null,
        // max_withdraw = null,
        percent_fee = null,
        withdraw_fee = null,
        // is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const [error, setError] = useState(false)

    return (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Beneficiary name</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.beneficiaryName}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryName"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Account number / IBAN</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               placeholder={""}
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Transfer description</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                name={"transferDescription"}
                                options={transferDescription}
                                placeholder={"Transfer details"}
                                value={inputs.transferDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Comment (optional)</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea value={inputs.comment}
                                  placeholder={""}
                                  name={"comment"}
                                  onChange={onInput}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Amount</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputCurrency.Validator value={inputs.amount}
                                                 onError={setError}
                                                 validators={[validateBalance(currency, navigate), validateMinimumAmount(new Decimal(min_withdraw).toNumber(), inputs.amount)]}>
                            <InputCurrency
                                onChange={(v: unknown) => setInputs(() => ({...inputs, amount: v}))}
                                className={error ? "!border-red-800" : ""}
                                value={inputs.amount}
                                currency={currency.$const}/>
                        </InputCurrency.Validator>
                    </div>
                </div>
            </div>
        </div>
        <Modal 
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title="Transfer confirmation"
        >
            <WithdrawConfirmSepa {...inputs} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full">
            <div className="col">
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '') || error}
                >
                    Withdraw
                </Button>
            </div>
        </div>
    </div>)
};

export default WithdrawFormSepa;
