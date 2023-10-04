import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {uncoverArray} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useRef, useState} from "react";
import {apiPaymentSepa} from "@/shared/api";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import Decimal from "decimal.js";
import useError from "@/shared/model/hooks/useError";
import {headerSepaGeneration, helperApiPaymentSepa} from "@/widgets/wallet/transfer/withdraw/model/helper";

const WithdrawConfirmBroker = ({amount, handleCancel}) => {
    const {
        networkIdSelect,
        networksForSelector,
        networksDefault
    } = useContext(CtxWalletNetworks);

    const {
        token_hot_address,
        withdraw_fee
    } = getNetworkForChose(
        networksDefault,
        networkIdSelect
    ) ?? {}

    const [loading, setLoading] = useState(false)

    // const {onInput} = useMask(MASK_CODE);
    const {$const} = useContext(CtxWalletData);
    const {account, setRefresh} = useContext(CtxRootData);
    const {label} = networksForSelector.find(it => it.value === networkIdSelect);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError()


    const details = useRef({
        purpose: "Purchase of EURG for EUR",
        iban: token_hot_address,
        account: account.account_id,
        beneficiaryName: account.name,
        amount: {
            sum: {
                currency: {
                    code: $const
                },
                value: amount
            }
        }
    });

    const onConfirm = async (token = null) => {

        setLoading(true);

        const header = await headerSepaGeneration(token)


        const response = await apiPaymentSepa(details.current, false, header);

        helperApiPaymentSepa(response).success((data) => {

            if (data.isConfirmToken && !token) {
                onConfirm(data.token)
            } else {
                setLoading(false)
                setRefresh();
                handleCancel();
            }

        }).reject(({errors}) => {
            setLoading(false)
            localErrorHunter(uncoverArray(errors))
        })
    }

    return loading ? <Loader className='mt-20'/> : <>
        <div className="row mb-5">
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
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Network</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{label}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Beneficiary Name</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{account.name}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Account Number</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{account.number}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Purpose</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>Purchase of EURG for EUR</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Amount</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{amount} {$const}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Fee</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                {new Decimal(withdraw_fee).toString()} EUR
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">You will get</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                {new Decimal(amount).minus(withdraw_fee).toString()} EURG
            </div>
        </div>

        <Form onFinish={(event) => onConfirm()}>
            <div className="row mt-4 mb-4">
                <div className="col">
                    <Button htmlType={"submit"} disabled={loading} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {localErrorInfoBox}
                </div>
            </div>
        </Form>
    </>
}

export default WithdrawConfirmBroker;
