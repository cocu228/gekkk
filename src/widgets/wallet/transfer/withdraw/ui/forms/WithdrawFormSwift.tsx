import {useContext, useState} from 'react';
import Input from "@/shared/ui/input/Input";
import Modal from "@/shared/ui/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import WithdrawConfirmSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawConfirmSepa";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {Switch} from "antd";
import {transferDescription, swiftUrgency, swiftCommission} from "@/widgets/wallet/transfer/withdraw/model/transfer-description";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import Decimal from "decimal.js";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {useNavigate} from "react-router-dom";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";

const WithdrawFormSwift = () => {

    const {isModalOpen, showModal, handleCancel} = useModal();
    const currency = useContext(CtxWalletData);
    const navigate = useNavigate();


    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        transferUrgency: null,
        transferFee : null,
        comment: null,
        country: null,
        amount: null,
    })

    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const {
        min_withdraw = null,
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const [error, setError] = useState(false)

    return (<div className="wrapper">
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
                        <span className="font-medium">Country</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"country"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Address</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"address"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">SWIFT/BIC</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"swift"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Beneficiary bank</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.country}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryBank"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2 flex justify-between">
                    <div className="col">
                        <span className="font-medium">Intermediary bank</span>
                    </div>
                    <div className="col">
                        <Switch className={"bg-gray-500"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Fee type</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferFee: v
                                }))}
                                name={"transferFee"}
                                options={swiftCommission}
                                placeholder={"Transfer fee"}
                                value={inputs.transferFee}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">Urgency</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferUrgency: v
                                }))}
                                name={"transferUrgency"}
                                options={swiftUrgency}
                                placeholder={"Transfer urgency"}
                                value={inputs.transferUrgency}
                        />
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
                                                 onError={(v) => setError(v)}
                                                 description={getWithdrawDesc(min_withdraw, currency.$const)}
                                                 validators={[validateBalance(currency, navigate), validateMinimumAmount(new Decimal(min_withdraw).toNumber(), inputs.amount, currency.$const)]}>
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>Input</span>}
                                onSelect={(v) => setInputs(() => ({
                                    ...inputs,
                                    amount: v
                                }))}
                            >
                            <InputCurrency
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    amount: v
                                }))}
                                value={inputs.amount}
                                currency={currency.$const}/>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>
                </div>
            </div>
        </div>
        <Modal width={450} title="Transfer confirmation"
               onCancel={handleCancel}
               open={isModalOpen}>

            <WithdrawConfirmSepa {...inputs}
                                 handleCancel={handleCancel}
            />

        </Modal>
        <div className="row w-full">
            <div className="col">
                <Button onClick={showModal} disabled={!inputs.amount || error} size={"xl"}
                        className="w-full">Withdraw</Button>
            </div>
        </div>
    </div>)

};

export default WithdrawFormSwift;
