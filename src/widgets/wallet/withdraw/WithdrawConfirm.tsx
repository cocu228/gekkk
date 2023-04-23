import React, {useContext} from "react";
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Button from "@/shared/ui/button/Button";

const WithdrawConfirm = ({
                             address,
                             amount,
                             receiver,
                             description
                         }) => {
    const {networkIdSelect, networksForSelector} = useContext(CtxWalletNetworks)
    const {label} = networksForSelector.find(it => it.value === networkIdSelect)

    const onClick = () => {

    }

    return <>
        <div className="row mb-10">
            <div className="col">
                <div className="p-4 bg-gray-300">
                    <div className="wrapper flex flex-col">
                        <div className="row mb-1">
                            <div className="col">
                                <span className="text-red-800">Please note</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                        <span className="text-gray-400">
                            You must only use a withdrawal address supported by the selected network. If the other platform does not support it, your assets may be lost.
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Network</span>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <span>{label}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Address</span>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <span>{address}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Receiver</span>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <span>{receiver}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Amount</span>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <span>{amount}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span className="text-gray-400">Description</span>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <span>{description}</span>
            </div>
        </div>
        <div className="row mb-8">
            <div className="col">
                <Button onClick={onClick} className="w-full" size={"xl"}>Confirm</Button>
            </div>
        </div>
    </>
}

export default WithdrawConfirm