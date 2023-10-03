import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import UseModal from "@/shared/model/hooks/useModal";
import {calculateAmount} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {AccountRights} from '@/shared/config/account-rights';
import {validateBalance, validateMinimumAmount} from '@/shared/config/validators';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import WithdrawConfirmBroker from "@/widgets/wallet/transfer/withdraw/ui/forms/broker/WithdrawConfirmBroker";

const WithdrawFormBroker = ({withdraw}: { withdraw?: boolean }) => {

    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const [amount, setAmount] = useState(null);
    const {currencies} = useContext(CtxCurrencies);
    const {isModalOpen, showModal, handleCancel} = UseModal();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);
    const [error, setError] = useState(false)

    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    return (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>

            <div className="col text-xs">
                <span>* Note:  Standard exchange fee is {withdraw ? withdraw_fee : "1.5%"}
                    {account.rights && account.rights[AccountRights.IsJuridical] ? null :
                        <> If you <span
                            className='text-blue-400 hover:cursor-pointer hover:underline'
                            onClick={() => navigate('/wallet/GKE/No Fee Program')}
                        >
                            freeze GKE tokens    
                        </span> fee is 0%.
                    </>}
                </span>
            </div>
        </div>

        <div className="row mb-4">
            <div className="col">
                <InputCurrency.Validator
                    value={amount}
                    onError={setError}
                    description={min_withdraw ? `Minimum amount is ${min_withdraw} ${currency.$const}` : ""}
                    validators={[validateMinimumAmount(min_withdraw), validateBalance(currency, navigate)]}
                >
                    <InputCurrency.PercentSelector onSelect={setAmount}
                                                   header={<span className='text-gray-600'>You will pay</span>}
                                                   currency={currencies.get(currency.$const)}>
                        <InputCurrency.DisplayBalance currency={currencies.get(currency.$const)}>
                            <InputCurrency
                                value={amount}
                                className={error ? "!border-red-800" : ""}
                                currency={currency.$const}
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
                            <span className="w-full text-end font-bold">{!amount ? 0 : amount} {currency.$const}</span>
                        </div>
                        <div className="row flex items-end">
                            <span
                                className="w-full text-end font-bold">{calculateAmount(!amount ? 0 : amount, 1.5, "afterPercentage")} {currency.$const}G</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title={withdraw ? "Withdraw confirmation" : "Top Up confirmation"}
        >
            <WithdrawConfirmBroker amount={amount} handleCancel={handleCancel}/>
        </Modal>
        <div className="row mb-8 w-full">
            <div className="col">
                <Button
                    size={"xl"}
                    disabled={!amount || error}
                    onClick={showModal}
                    className="w-full mt-5"
                >
                    {withdraw ? "Sell EURG" : "Buy EURG"}
                </Button>
            </div>
        </div>
    </div>)
};

export default WithdrawFormBroker;
