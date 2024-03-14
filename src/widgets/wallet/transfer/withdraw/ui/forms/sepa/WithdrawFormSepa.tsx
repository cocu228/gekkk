import {useContext, useEffect, useRef, useState} from 'react';
import Modal from "@/shared/ui/modal/Modal";
import {Modal as ModalAnt} from "antd"
import Input from "@/shared/ui/input/Input";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Select from "@/shared/ui/select/Select";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import WithdrawConfirmSepa from "./WithdrawConfirmSepa";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import {getWithdrawDesc} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {validateBalance, validateMinimumAmount} from "@/shared/config/validators";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {useInputValidateState} from "@/shared/ui/input-currency/model/useInputValidateState";
import {transferDescriptions} from "@/widgets/wallet/transfer/withdraw/model/transfer-descriptions";
import {getInitialProps, useTranslation} from "react-i18next";
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import styles from "../styles.module.scss"
import { CtxRootData } from '@/processes/RootContext';
import { IResCommission, apiPaymentSepa } from '@/shared/api';
import { apiGetUas } from '@/shared/(orval)api';
import { storeAccountDetails } from '@/shared/store/account-details/accountDetails';


interface IState {
    loading: boolean;
    total: IResCommission;
    status: 'error' | 'success' | null;
}

const WithdrawFormSepa = () => {
    const [transferDescriptionsTranslated, setTransferDescriptionsTranslated] = useState(null);
    const {initialLanguage} = getInitialProps();

    useEffect(()=>{
        setTransferDescriptionsTranslated(
            transferDescriptions.map(el=>{
            return {
                    "value" : el.value,
                    "label" : t(`${el.value}`)
                }
            })
        )
    },[initialLanguage])

    const {t} = useTranslation();
    const currency = useContext(CtxWalletData);
    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate();
    const {networkTypeSelect, tokenNetworks} = useContext(CtxWalletNetworks);
    const {md} = useBreakpoints()
    const { setRefresh } = useContext(CtxRootData)

    const [{
        total,
        status,
        loading,
    }, setState] = useState<IState>({
        status: null,
        loading: false,
        total: undefined,
    });

    const [inputs, setInputs] = useState({
        beneficiaryName: null,
        accountNumber: null,
        transferDescription: null,
        comment: null
    })
    
    const onInput = ({target}) => {
        setInputs(prev => ({...prev, [target.name]: target.value}))
    }

    const {
        min_withdraw = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    const {account} = useContext(CtxRootData);

    const {$const} = useContext(CtxWalletData);
    
    const {inputCurr, setInputCurr} = useInputState()
    const {inputCurrValid, setInputCurrValid} = useInputValidateState()
    const {getAccountDetails} = storeAccountDetails(state => state);
    
    const details = useRef({
        purpose: inputs.comment,
        iban: inputs.accountNumber,
        account: account.account_id,
        beneficiaryName: inputs.beneficiaryName,
        transferDetails: transferDescriptions.find(d => d.value === inputs.transferDescription)?.label,
        amount: {
            sum: {
                currency: {
                    code: $const
                },
                value: inputCurr.value.number
            }
        }
    });

    useEffect(() => {
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();
            
            apiPaymentSepa(details.current, true, {
                Authorization: phone,
                Token: data.result.token
            }).then(({data}) => (setState(prev => ({
                ...prev,
                total: data as IResCommission
            }))));
        })();
    }, [inputCurr.value.number]);


    return !md ? (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("beneficiary_name")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.beneficiaryName}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryName"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("IBAN")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("transfer_desc")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                name={"transferDescription"}
                                options={transferDescriptionsTranslated}
                                placeholder={t("transfer_details.name")}
                                value={inputs.transferDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row mb-2">
                    <div className="col">
                        <span className="font-medium">{t("сomment")}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col flex items-center">
                        <TextArea value={inputs.comment}
                                  name={"comment"}
                                  onChange={onInput}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <InputCurrency.Validator value={inputCurr.value.number}
                                                 description={getWithdrawDesc(min_withdraw, currency.$const)}
                                                 onError={setInputCurrValid}
                                                 validators={[validateBalance(currency, navigate, t),
                                                     validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)]}>
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-gray-600 font-medium'>{t("amount")}</span>}
                                onSelect={setInputCurr}
                            >
                            <InputCurrency
                                onChange={setInputCurr}
                                value={inputCurr.value.string}
                                currency={currency.$const}/>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>
                </div>
            </div>
        </div>
        <Modal 
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title={t("transfer_confirmation")}
        >
            <WithdrawConfirmSepa handleCancel={()=>{handleCancel();setRefresh()}} {...inputs} amount={inputCurr.value.number}/>
        </Modal>
        <div className="row w-full">
            <div className="col">
                <Button
                    size={"xl"}
                    className="w-full"
                    onClick={showModal}
                    disabled={!Object.values(inputs).every(v => v !== null && v !== '') || inputCurrValid.value}
                >
                    {t("withdraw")}
                </Button>
            </div>
        </div>
    </div>) : (<div className="wrapper">
        <div className="row mb-8 w-full">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <InputCurrency.Validator value={inputCurr.value.number}
                                                 description={getWithdrawDesc(min_withdraw, currency.$const)}
                                                 onError={setInputCurrValid}
                                                 validators={[validateBalance(currency, navigate, t),
                                                     validateMinimumAmount(min_withdraw, inputCurr.value.number, currency.$const, t)]}>
                            <InputCurrency.PercentSelector
                                currency={currency}
                                header={<span className='text-[#1F3446] text-[12px] font-semibold'>{t("amount")}</span>}
                                onSelect={setInputCurr}
                            >
                                <InputCurrency.DisplayBalance currency={currency}>
                                    <InputCurrency
                                        onChange={setInputCurr}
                                        value={inputCurr.value.string}
                                        currency={currency.$const}
                                    />
                                </InputCurrency.DisplayBalance>
                            </InputCurrency.PercentSelector>
                        </InputCurrency.Validator>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-8 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="row min-w-[80px] mb-2 mr-5">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">IBAN:</span>
                    </div>
                </div>
                <div className="row w-full">
                    <div className="col w-full basis-[100%]">
                        <Input value={inputs.accountNumber} onChange={onInput}
                               name={"accountNumber"}/>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col mb-8 w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="row min-w-[80px] mb-2 mr-5">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">{t("recipient")}:</span>
                    </div>
                </div>
                <div className="row w-full">
                    <div className="col">
                        <Input value={inputs.beneficiaryName}
                               onChange={onInput}
                               placeholder={""}
                               name={"beneficiaryName"}/>
                    </div>
                </div>
            </div>
            <div className='ml-5'>
                <span className='text-[10px]'>
                *As required by EU law, you must provide the name of the recipient of the funds
                </span>
            </div>
        </div>
        
        <div className="row mb-8 w-full">
            <div className="flex flex-row items-center">
                <div className="row min-w-[80px] mb-2 mr-5">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">{t("description")}:</span>
                    </div>
                </div>
                <div className="row w-full">
                    <div className="col">
                        <Select className="w-full"
                                onChange={(v: unknown) => setInputs(() => ({
                                    ...inputs,
                                    transferDescription: v
                                }))}
                                name={"transferDescription"}
                                options={transferDescriptionsTranslated}
                                placeholder={t("transfer_details.name")}
                                value={inputs.transferDescription}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.PayInfo}>
            <div className={styles.PayInfoCol}>
                <div className="row">
                    <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
                </div>
                <div className="row">
                <span className={styles.PayInfoText}>
                    {t("you_will_get")}:
                </span>
                </div>
                <div className="row">
                    <span className={styles.PayInfoTextFee}>
                        {t("fee")}:
                    </span>
                </div>
            </div>
            <div className={styles.PayInfoColValue}>

                <div className={styles.PayInfoCol}>
                    <div className={styles.PayInfoValueFlex}>
                        <span
                            className={styles.PayInfoValueFlexText}>{inputCurr.value.number}</span>
                    </div>
                    <div className={styles.PayInfoValueFlex}>
                        <span
                            className={styles.PayInfoValueFlexText}
                        >
                                {total?.total ? total.total : "-" }
                        </span>
                    </div>
                    <div className={styles.PayInfoValueFlex}>
                        <span
                            className={styles.PayInfoValueFlexTextFee}
                        >
                            {total?.commission ?? "-"}
                        </span>
                    </div>
                </div>
                
                <div className={styles.PayInfoCol}>
                    <span className={styles.PayInfoValueFlexTextCurrency}>
                        {currency.$const}
                    </span>
                    <span className={styles.PayInfoValueFlexTextCurrency}>
                        {currency.$const}
                    </span>
                    <span className={styles.PayInfoValueFlexTextFee}>
                        {currency.$const}
                    </span>
                </div>
            </div>
            
        </div>
        <ModalAnt 
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title={<span className={styles.MainModalTitle}>{t("confirm_transaction")}</span>}
            footer={null}
        >
            <WithdrawConfirmSepa {...inputs} amount={inputCurr.value.number} handleCancel={()=>{handleCancel();setRefresh()}}/>
        </ModalAnt>
        <div className="flex flex-col w-full">
            <div className={styles.ButtonContainerCenter}>
                <Button
                    greenTransfer
                    size={"xl"}
                    className={"w-full"}
                    onClick={showModal}
                    disabled={!Object.entries(inputs).filter(el=>el[0] !== "comment").every(v => v[1] !== null && v[1] !== '') || inputCurrValid.value}
                >
                    {t("withdraw")}
                </Button>
            </div>
            <div className='w-full flex justify-center'>
                <span className='text-[#9D9D9D] text-[10px]'>
                    {t("fee_is_prec")} <span className='font-bold'>{total?.commission ?? "-"} {currency.$const} </span> {t("per_transaction")}
                </span>
            </div>
        </div>
    </div>)
};

export default WithdrawFormSepa;
