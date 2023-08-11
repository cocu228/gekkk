import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import useModal from "@/shared/model/hooks/useModal";
import {calculateAmount} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {storeOrganizations} from "@/shared/store/organizations";
import {getNetworkForChose} from "@/widgets/wallet/model/helper";
import {validateMinimumAmount} from '@/shared/config/validators';
import WithdrawConfirmBank from "@/widgets/wallet/EURG/WithdrawConfirmBank";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/model/context";

const GekkardAccount = () => {
    const organizations = storeOrganizations(state => state.organizations)
    const wallet = useContext(CtxWalletData)
    const {currencies} = useContext(CtxRootData)
    const [amount, setAmount] = useState(null)
    const {isModalOpen, showModal, handleCancel} = useModal()
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)

    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    if (!organizations) return <p>Loading bank data...</p>

    return (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>
            <div className="col text-xs">
                <span>* Note:  Standart exchange fee is 1,5%. If you freeze GKE tokens fee is 0%.</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <InputCurrency.Validator
                    value={amount}
                    description={`Minimum top up amount is ${min_withdraw} ${wallet.$const}`}
                    validators={[validateMinimumAmount(min_withdraw)]}
                >
                    <InputCurrency.PercentSelector onSelect={setAmount}
                                                   header={<span className='text-gray-600'>Input</span>}
                                                   currency={currencies.get(wallet.$const)}>
                        <InputCurrency.DisplayBalance currency={currencies.get(wallet.$const)}>
                            <InputCurrency
                                value={amount}
                                currency={wallet.$const}
                                onChange={v =>
                                    setAmount(v)
                                }
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
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span className="w-full text-end font-bold">{!amount ? 0 : amount}</span>
                        </div>
                        <div className="row flex items-end">
                            <span
                                className="w-full text-end font-bold">{calculateAmount(!amount ? 0 : amount, 1.5, "afterPercentage")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <Button onClick={showModal} disabled={!amount} className="w-full mt-5" size={"xl"}>Buy EURG</Button>
                <Modal width={450} title="Withdraw confirmation" onCancel={handleCancel}
                       open={isModalOpen}>
                    <WithdrawConfirmBank amount={amount} handleCancel={handleCancel}
                                         withdraw_fee={min_withdraw}/>
                </Modal>
            </div>
        </div>
    </div>)

};

export default GekkardAccount;
