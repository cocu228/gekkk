import {useContext, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from '@/processes/RootContext';
import useModal from "@/shared/model/hooks/useModal";
import {calculateAmount} from "@/shared/lib/helpers";
import InputCurrency from '@/shared/ui/input-currency/ui';
import {getNetworkForChose} from "@/widgets/wallet/model/helpers";
import {validateMinimumAmount} from '@/shared/config/validators';
import WithdrawConfirmBank from "@/widgets/wallet/EURG/WithdrawConfirmBank";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import { useNavigate } from 'react-router-dom';
import { AccountRights } from '@/shared/config/account-rights';
import {apiGekkardExchange} from "@/shared/api/wallet/exchange";

const GekkardAccount = ({withdraw}: { withdraw?: boolean }) => {

    const navigate = useNavigate();
    const currency = useContext(CtxWalletData);
    const [amount, setAmount] = useState(null);
    const {account, currencies} = useContext(CtxRootData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks);

    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const onClick = () => {
        const response = apiGekkardExchange({
            account: account.id,
            amount: amount,
            exchangeType: withdraw ? "SELL" : "BUY",
            geekCoinAmount: 1,
            geekcoinWalletId: account.idInfoClient.toString()
        })

        console.log(response)
    }

    return (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>

            <div className="col text-xs">
                <span>* Note:  Standard exchange fee is 1,5%.
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
                    description={`Minimum amount is ${withdraw ? withdraw_fee : "15"} ${currency.$const}`}
                    validators={[validateMinimumAmount(min_withdraw)]}
                >
                    <InputCurrency.PercentSelector onSelect={setAmount}
                                                   header={<span className='text-gray-600'>You will pay</span>}
                                                   currency={currencies.get(currency.$const)}>
                        <InputCurrency.DisplayBalance currency={currencies.get(currency.$const)}>
                            <InputCurrency
                                value={amount}
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
                <Button onClick={onClick} disabled={!amount} className="w-full mt-5" size={"xl"}>
                    {withdraw ? "Sell EURG" : "Buy EURG"}
                </Button>
                <Modal width={450}
                       title={withdraw ? "Withdraw confirmation" : "Top Up confirmation"}
                       onCancel={handleCancel}
                       open={isModalOpen}>
                    <WithdrawConfirmBank amount={amount}
                                         handleCancel={handleCancel}
                                         withdraw_fee={min_withdraw}/>
                </Modal>
            </div>
        </div>
    </div>)

};

export default GekkardAccount;
