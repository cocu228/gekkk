import React, {useContext, useState} from 'react';
import InputCurrencyPercented from "../../../shared/ui/input-currency";
import Button from "@/shared/ui/button/Button";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Modal from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import {getNetworkForChose} from "@/widgets/wallet/model/helper";
import WithdrawConfirmBank from "@/widgets/wallet/EURG/WithdrawConfirmBank";
import { storeBankData } from '@/shared/store/bank-data/bank-data';
import { ICtxCurrencyData } from '@/app/RootContext';
import Decimal from 'decimal.js';
import {calculateAmount} from "@/shared/lib/helpers";

const GekkardAccount = () => {

    const bankData = storeBankData(state => state.bankData)
    const wallet = useContext(CtxWalletData)
    const [input, setInput] = useState(null)
    const {isModalOpen, showModal, handleCancel} = useModal()
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)

    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    if (!bankData) return <p>Loading bank data...</p>

    const ibanBalanceWallet: ICtxCurrencyData = {
        ...wallet,
        availableBalance: new Decimal(bankData.accounts[0].balance)
    }

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
                <InputCurrencyPercented
                    value={input}
                    onChange={setInput}
                    currencyData={ibanBalanceWallet}
                    // currencyData={wallet}
                    minValue={min_withdraw}
                />
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
                            <span className="w-full text-end font-bold">{!input ? 0 : input}</span>
                        </div>
                        <div className="row flex items-end">
                            <span
                                className="w-full text-end font-bold">{calculateAmount(!input ? 0 : input, 1.5, "afterPercentage")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <Button onClick={showModal} disabled={!input} className="w-full mt-5" size={"xl"}>Buy EURG</Button>
                <Modal width={450} title="Withdraw confirmation" onCancel={handleCancel}
                       open={isModalOpen}>
                    <WithdrawConfirmBank amount={input} handleCancel={handleCancel}
                                         withdraw_fee={min_withdraw}/>
                </Modal>
            </div>
        </div>
    </div>)

};

export default GekkardAccount;
