import React, {useContext, useState} from 'react';
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import InputCurrency from "../../../shared/ui/input-currency";
import Button from "@/shared/ui/button/Button";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Modal from "@/shared/ui/modal/Modal";
import WithdrawConfirm from "@/widgets/wallet/withdraw/WithdrawConfirm";
import useModal from "@/shared/model/hooks/useModal";
import {getNetworkForChose} from "@/widgets/wallet/model/helper";
import WithdrawConfirmBank from "@/widgets/wallet/EURG/WithdrawConfirmBank";

const GekkardAccount = () => {

    const wallet = useContext(CtxWalletData)
    const [input, setInput] = useState(null)
    const {isModalOpen, showModal, handleCancel} = useModal()
    const {networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const {
        min_withdraw = null,
        withdraw_fee = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const onClick = () => {

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
        <div className="row">
            <div className="col">
                <InputCurrency
                    value={input}
                    onChange={setInput}
                    currencyData={wallet}
                    minValue={min_withdraw}
                />
            </div>
        </div>
        <div className="row">
            <div className="col">

                <Button onClick={showModal} className="w-full" size={"xl"}>Buy EURG</Button>
                <Modal width={450} title="Withdraw confirmation" onCancel={handleCancel}
                       open={isModalOpen}>
                    <WithdrawConfirmBank amount={input} handleCancel={handleCancel} withdraw_fee={min_withdraw}/>
                </Modal>
            </div>
        </div>
    </div>)

};

export default GekkardAccount;
