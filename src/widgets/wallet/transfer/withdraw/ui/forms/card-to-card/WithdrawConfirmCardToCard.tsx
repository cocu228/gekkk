import md5 from 'md5';
import {Skeleton} from "antd";
import {AxiosResponse} from "axios";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {MASK_CODE} from "@/shared/config/mask";
import useMask from "@/shared/model/hooks/useMask";
import {getCookieData} from "@/shared/lib/helpers";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import FormItem from "@/shared/ui/form/form-item/FormItem";
import {useContext, useEffect, useRef, useState} from "react";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {signHeadersGeneration} from "@/widgets/wallet/transfer/withdraw/model/helper";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {apiPasswordVerify, apiPaymentContact, IResCommission, IResErrors} from "@/shared/api";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";

interface IState {
    loading: boolean;
    total: IResCommission;
    confirmation: {
        code: string;
        token: string;
        codeLength: number;
    }
}

const WithdrawConfirmCardToCard = ({
    amount,
    comment,
    cardNumber,
    selectedCard,
    cardholderName,
    handleCancel
}) => {
    const [{
        total,
        loading,
        confirmation
    }, setState] = useState<IState>({
        loading: false,
        total: undefined,
        confirmation: {
            code: "",
            token: null,
            codeLength: null
        }
    });
    const setContent = useContext(CtxModalTrxInfo)
    const {onInput} = useMask(MASK_CODE);
    const {$const} = useContext(CtxWalletData);
    const {phone} = getCookieData<{phone: string}>();
    const {account, setRefresh} = useContext(CtxRootData);
    const cards = storeBankCards(state => state.bankCards);
    const {networkIdSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkIdSelect);
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();

    const details = useRef({
        account: account.account_id,
        beneficiaryName: cardholderName,
        cardNumber: cardNumber,
        fromCardId: selectedCard,
        purpose: comment,
        amount: {
            sum: {
                value: amount,
                currency: {
                    code: $const
                }
            }
        }
    });

    const onConfirm = async () => {
        const headers = await signHeadersGeneration(confirmation.token);

        await apiPaymentContact(
            details.current,
            false,
            headers
        ).then((response: AxiosResponse<IResErrors>) => {
            const {data} = response;

            if (data?.errors) {
                if (data.errors[0].code !== 449) return;

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
            setContent(<CtnTrxInfo/>)
        });
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

    useEffect(() => {
        apiPaymentContact(details.current, true).then(({data}) => {
            setState(prev => ({
                ...prev,
                total: data as IResCommission
            }));
        });
    }, []);
    
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
                    <span className="text-gray-400">Sender's Card Number</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{formatCardNumber(cards.find(c => c.cardId === selectedCard).displayPan)}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's Card Number</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{cardNumber}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Recipient's Name</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{cardholderName}</span>
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

            <Form onFinish={() => {
                setState(prev => ({
                    ...prev,
                    loading: true
                }));

                !confirmation.code
                    ? onConfirm()
                    : apiPasswordVerify(md5(`${confirmation.code}_${phone}`))
                        .then(onConfirm)
                        .catch(onError)
            }}>
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
                <div className="row my-5">
                    <div className="col">
                        <Button size={"xl"}
                                htmlType={"submit"}
                                className="w-full"
                                disabled={!total || localIndicatorError || (confirmation.token && !confirmation.code)}
                        >Confirm</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default WithdrawConfirmCardToCard;
