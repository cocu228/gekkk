import {useCallback, useContext, useEffect, useState} from 'react';
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
import {toNumberInputCurrency} from "@/shared/ui/input-currency/model/helpers";


const WithdrawFormBroker = () => {

    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);
    const currency = useContext(CtxWalletData);
    const {networkIdSelect, networksDefault, setNetworkId, setRefresh} = useContext(CtxWalletNetworks);

    const [amount, setAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isModalOpen, showModal, handleCancel} = UseModal();
    const [error, setError] = useState(false);

    const delayRes = useCallback(debounce((amount) => setRefresh(true, amount), 2000), []);

    const {
        min_withdraw = null,
        withdraw_fee = null,
        token_hot_address = "",
        percent_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    useEffect(() => {
        setLoading(true)
        delayRes(toNumberInputCurrency(amount))

    }, [amount]);

    useEffect(() => {
        setLoading(false)
    }, [withdraw_fee]);


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
                    value={amount}
                    onError={setError}
                    description={min_withdraw ? `Minimum amount is ${new Decimal(min_withdraw).toString()} ${currency.$const}` : ""}
                    validators={[validateMinimumAmount(new Decimal(min_withdraw).toNumber(), amount), validateBalance(currency, navigate)]}>
                    <InputCurrency.PercentSelector onSelect={setAmount}
                                                   header={<span className='text-gray-600 font-medium'>You will pay</span>}
                                                   currency={currency}>
                        <InputCurrency.DisplayBalance currency={currency}>
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
                        <div className="row">
                            <span>
                          Fee
                        </span>
                        </div>
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span className="w-full text-start">{!amount ? 0 : amount} {currency.$const}</span>
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(toNumberInputCurrency(amount)).minus(withdraw_fee).toString()} {currency.$const}G</span>}
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
            title={"Withdraw confirmation"}>
            <WithdrawConfirmBroker amount={amount} handleCancel={handleCancel}/>
        </Modal>
        <div className="row w-full mt-4">
            <div className="col">
                <Button
                    size={"xl"}
                    disabled={!amount || error || loading}
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
