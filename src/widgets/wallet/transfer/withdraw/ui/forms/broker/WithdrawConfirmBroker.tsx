import md5 from 'md5';
import Decimal from "decimal.js";
import {AxiosResponse} from "axios";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {MASK_CODE} from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import {getCookieData} from "@/shared/lib/helpers";
import {useContext, useRef, useState} from "react";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import {signHeadersGeneration} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiPasswordVerify, apiPaymentSepa, IResErrors} from "@/shared/api";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import Input from "@/shared/ui/input/Input";
import usePinConfirmation from "./usePinConfirmation";

interface IState {
    loading: boolean;
    confirmation: {
        code: string;
        token: string;
        codeLength: number;
    }
}

const WithdrawConfirmBroker = ({amount, handleCancel}) => {
    const [{
        loading,
        confirmation
    }, setState] = useState<IState>({
        loading: false,
        confirmation: {
            code: "",
            token: null,
            codeLength: null
        }
    });
    
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

    const {onInput} = useMask(MASK_CODE);
    const {$const} = useContext(CtxWalletData);
    const {phone} = getCookieData<{phone: string}>();
    const {account, setRefresh} = useContext(CtxRootData);
    const {label} = networksForSelector.find(it => it.value === networkIdSelect);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();

    const {confirmRequest, confirmationModal, isConfirmationRequired} = usePinConfirmation();
    
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

    const onConfirm = async () => {
        confirmRequest(apiPaymentSepa, {
            payment_details: details.current,
            commission: false
        });
        
        // await apiPaymentSepa({
        //     payment_details: details.current,
        //     commission: false,
        //     headers: headers
        // }).then((response: AxiosResponse<IResErrors>) => {
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

    const onError = () => {
        localErrorHunter({
            code: 401,
            message: 'Confirmation PIN is incorrect'
        });

        setState(prev => ({
            ...prev,
            loading: false,
            confirmation: {
                ...prev.confirmation,
                code: null
            }
        }));
    }

    return <div>
        {loading && <Loader className='justify-center'/>}
        
        <div className={loading ? 'collapse' : ''}>
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
            
            {confirmationModal}
            
            <Form
                onFinish={() => {
                    setState(prev => ({
                        ...prev,
                        loading: true
                    }));

                    !confirmation.code
                        ? onConfirm()
                        : apiPasswordVerify(md5(`${confirmation.code}_${phone}`))
                            .then(onConfirm)
                            .catch(onError)
                }}
            >
                {!confirmation.token ? null : <>
                    <span className="text-gray-400">Transfer confirm</span>

                    <FormItem className={"mb-4"} name="code" label="Code" preserve>
                        <Input type="text"
                               onInput={(e) => {
                                   onInput(e);
                                   localErrorClear();
                               }}
                               placeholder="Enter your PIN"
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
                <div className="row">
                    <div className="col">
                        {localErrorInfoBox}
                    </div>
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col">
                        <Button size={"xl"}
                                className="w-full"
                                htmlType={"submit"}
                                disabled={localIndicatorError || (confirmation.token && !confirmation.code)}
                        >Confirm</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default WithdrawConfirmBroker;
