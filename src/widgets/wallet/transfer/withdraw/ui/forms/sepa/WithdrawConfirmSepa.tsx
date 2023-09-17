import {AxiosResponse} from "axios";
import {Skeleton, Input} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {MASK_CODE} from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import {CtxRootData} from "@/processes/RootContext";
import {codeMessage} from "@/shared/config/message";
import useError from "@/shared/model/hooks/useError";
import {useContext, useEffect, useState} from "react";
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import TransferDescription from "@/widgets/wallet/transfer/withdraw/model/transfer-description";
import {apiPaymentSepa, IResCommission, IResErrors} from "@/shared/api/bank/payments/payment-sepa";

const WithdrawConfirmSepa = ({
    beneficiaryName,
    accountNumber,
    transferDescription,
    comment,
    amount,
    handleCancel,
}) => {
    const {
        networkIdSelect,
        networksForSelector,
        networksDefault
    } = useContext(CtxWalletNetworks);

    const {
        is_operable = null
    } = getNetworkForChose(
        networksDefault,
        networkIdSelect
    ) ?? {}

    const [{
        total,
        loading,
        confirmation
    }, setState] = useState<{
        loading: boolean;
        total: IResCommission;
        confirmation: {
            code: string;
            token: string;
            codeLength: number;
        }
    }>({
        loading: false,
        total: undefined,
        confirmation: {
            code: "",
            token: null,
            codeLength: null
        }
    });

    const {onInput} = useMask(MASK_CODE);
    const {$const} = useContext(CtxWalletData);
    const {account, setRefresh} = useContext(CtxRootData);
    const {label} = networksForSelector.find(it => it.value === networkIdSelect);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();

    const paymentDetails = {
        purpose: comment,
        iban: accountNumber,
        account: account.account_id,
        beneficiaryName: beneficiaryName,
        transferDetails: TransferDescription.find(d => d.value === transferDescription).label,
        amount: {
            sum: {
                currency: {
                    code: $const
                },
                value: amount
            }
        }
    };

    const onConfirm = async () => {
        // console.log(`sepa: accounts`, account.account_id);
        // console.log(`sepa: paymentDetails`, paymentDetails);

        setState(prev => ({
            ...prev,
            loading: true
        }));

        // TODO: Error handling, JWT signing token generation
        await apiPaymentSepa(
            paymentDetails,
            false,
            !confirmation.token ? null : {
                "X-Confirmation-Type": "PIN",
                "X-Confirmation-Token": confirmation.token,
                "X-Confirmation-Code": confirmation.code
            }
            ).then((response: AxiosResponse<IResErrors>) => {
                const {data} = response;

                if (data?.errors) {
                    if (data.errors[0].code !== 449) throw data.errors[0].message;
                    
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        confirmation: {
                            ...prev.confirmation,
                            token: data.errors[0].properties['confirmationToken'],
                            codeLength: data.errors[0].properties['confirmationCodeLength']
                        }
                    }));
                    return;
                }
                
                setState(prev => ({
                    ...prev,
                    loading: false,
                }));
                setRefresh();
                handleCancel();
            });
    }

    useEffect(() => {
        apiPaymentSepa(paymentDetails, true).then(({data}) => {
            setState(prev => ({
                ...prev,
                total: data as IResCommission
            }));
        });
    }, []);

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
                <span>{beneficiaryName}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Account Number</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{accountNumber}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Amount</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                {total !== undefined ? (
                    <span>{total.total ?? '-'} {$const}</span>
                ) : (
                    <Skeleton.Input style={{height: 16}} active/>
                )}
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Fee</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                {total !== undefined ? (
                    <span>{total.commission ?? '-'} {$const}</span>
                ) : (
                    <Skeleton.Input style={{height: 16}} active/>
                )}
            </div>
        </div>
        {!comment ? null : <>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Comment</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{comment}</span>
                </div>
            </div>
        </>}

        <Form onFinish={onConfirm}>
            {!confirmation.token ? null : <>
                <span className="text-gray-400">Transfer confirm</span>

                <FormItem className={"mb-4"} name="code" label="Code" preserve
                          rules={[{required: confirmation.token.length > 0, ...codeMessage}]}>
                    <Input type="text"
                           onInput={onInput}
                           placeholder="Enter your PIN"
                           maxLength={confirmation.codeLength + 2 ?? 0}
                           onChange={({target}) => setState(prev => ({
                               ...prev,
                               confirmation: {
                                   ...prev.confirmation,
                                   code: target.value.replace(/ /g, '')
                               }
                           }))}
                           autoComplete="off"
                    />
                </FormItem>
            </>}

            <div className="row mt-5">
                <div className="col">
                    <Button htmlType={"submit"} disabled={!total} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
                <div className="col flex justify-center mt-4">
                    {localErrorInfoBox}
                </div>
            </div>
        </Form>

        {is_operable === false && <>
            <div className="info-box-danger">
                <p>Attention: transactions on this network may be delayed. We recommend that you use a different
                    network for this transaction.</p>
            </div>
        </>}
    </>
}

export default WithdrawConfirmSepa;
