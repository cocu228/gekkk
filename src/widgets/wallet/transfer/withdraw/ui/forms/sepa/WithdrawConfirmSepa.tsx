import {Skeleton} from "antd";
import {AxiosResponse} from "axios";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {getCookieData} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useState} from "react";
import {apiPaymentSepa, IResCommission, IResErrors} from "@/shared/api";
import {generateJWT, getTransactionSignParams} from "@/shared/lib/crypto-service";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import TransferDescription from "@/widgets/wallet/transfer/withdraw/model/transfer-description";

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
        // networksDefault
    } = useContext(CtxWalletNetworks);

    // const {
    //     is_operable = null
    // } = getNetworkForChose(
    //     networksDefault,
    //     networkIdSelect
    // ) ?? {}

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

    // const {onInput} = useMask(MASK_CODE);
    const {$const} = useContext(CtxWalletData);
    const {account, setRefresh} = useContext(CtxRootData);
    const {label} = networksForSelector.find(it => it.value === networkIdSelect);

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
        setState(prev => ({
            ...prev,
            loading: true
        }));
        
        const {
            appUuid,
            appPass
        } = confirmation.token
            ? await getTransactionSignParams()
            : {appUuid: null, appPass: null};

        const {phone} = getCookieData<{phone: string}>();
        
        const jwtPayload = {
            initiator: phone,
            confirmationToken: confirmation.token,
            exp: Date.now() + 0.5 * 60 * 1000 // + 30sec
        };

        await apiPaymentSepa(
            paymentDetails,
            false,
            {
                "X-Confirmation-Type": "SIGN",
                ...(confirmation.token ? {
                    "X-Confirmation-Code": generateJWT(jwtPayload, appPass),
                    "X-Confirmation-Token": confirmation.token,
                    "X-App-Uuid": appUuid
                } : null)
            }
        ).then((response: AxiosResponse<IResErrors>) => {
            const {data} = response;

            if (data?.errors) {
                if (data.errors[0].code !== 449) return;

                setState(prev => ({
                    ...prev,
                    // loading: false, TODO: Uncomment this on sign update
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
        
        // -------------- PIN CONFIRMATION --------------
        // await apiPaymentSepa(
        //     paymentDetails,
        //     false,
        //     !confirmation.token ? null : {
        //         "X-Confirmation-Type": "PIN",
        //         "X-Confirmation-Token": confirmation.token,
        //         "X-Confirmation-Code": confirmation.code
        //     }
        // ).then((response: AxiosResponse<IResErrors>) => {
        //     const {data} = response;
        //     
        //     if (data?.errors) {
        //         if (data.errors[0].code !== 449) return;
        //        
        //         setState(prev => ({
        //             ...prev,
        //             loading: false,
        //             confirmation: {
        //                 ...prev.confirmation,
        //                 token: data.errors[0].properties['confirmationToken'],
        //                 codeLength: data.errors[0].properties['confirmationCodeLength']
        //             }
        //         }));
        //         return;
        //     }
        //    
        //     setState(prev => ({
        //         ...prev,
        //         loading: false,
        //     }));
        //     setRefresh();
        //     handleCancel();
        // });
    }
    
    // TODO: Update this block on sign update
    useEffect(() => {
        if (confirmation.token) {
            onConfirm();
        }
    }, [confirmation]);
    
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
                <span>{amount ?? '-'} {$const}</span>
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
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Total amount</span>
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
                {/* TODO: Update this block on sign update */}
                {/*<span className="text-gray-400">Transfer confirm</span>*/}
                
                {/*<FormItem className={"mb-4"} name="code" label="Code" preserve*/}
                {/*          rules={[{required: confirmation.token.length > 0, ...codeMessage}]}>*/}
                {/*    <Input type="text"*/}
                {/*           onInput={onInput}*/}
                {/*           placeholder="Enter your PIN"*/}
                {/*           onChange={({target}) => setState(prev => ({*/}
                {/*               ...prev,*/}
                {/*               confirmation: {*/}
                {/*                   ...prev.confirmation,*/}
                {/*                   code: target.value.replace(/ /g, '')*/}
                {/*               }*/}
                {/*           }))}*/}
                {/*           autoComplete="off"*/}
                {/*    />*/}
                {/*</FormItem>*/}
            </>}

            <div className="row my-5">
                <div className="col">
                    <Button htmlType={"submit"} disabled={!total} className="w-full"
                            size={"xl"}>Confirm</Button>
                </div>
            </div>
        </Form>

        {/* Network is operable by bank */}
        {/*{is_operable === false && <>*/}
        {/*    <div className="info-box-danger">*/}
        {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
        {/*            network for this transaction.</p>*/}
        {/*    </div>*/}
        {/*</>}*/}
    </>
}

export default WithdrawConfirmSepa;
