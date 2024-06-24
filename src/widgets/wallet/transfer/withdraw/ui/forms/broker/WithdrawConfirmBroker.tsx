import Decimal from "decimal.js";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import {apiPaymentSepa} from "@/shared/api";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxRootData} from "@/processes/RootContext";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "../styles.module.scss";
import ModalTrxStatusSuccess from "../../modals/ModalTrxStatusSuccess";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxDisplayHistory } from "@/pages/transfers/history-wrapper/model/CtxDisplayHistory";
import Commissions from "@/widgets/wallet/transfer/components/commissions";
import { UasConfirmCtx } from "@/processes/errors-provider-context";

const WithdrawConfirmBroker = ({amount, handleCancel}) => {
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const {setContent} = useContext(CtxGlobalModalContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { displayHistory } = useContext(CtxDisplayHistory);
    const { uasToken } = useContext(UasConfirmCtx)

    const {
        networkTypeSelect,
        networksForSelector,
        tokenNetworks
    } = useContext(CtxWalletNetworks);

    const {
        token_hot_address,
        withdraw_fee
    } = getChosenNetwork(
        tokenNetworks,
        networkTypeSelect
    ) ?? {}

    const {account} = useContext(CtxRootData);
    const {setRefresh} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    console.log('uas', uasToken)

    const details = useRef({
        purpose: t("purchase_of", {token: "EURG"}),
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
        setLoading(true);
        
        const {phone} = await getAccountDetails();
        
        await apiPaymentSepa(details.current, false, {
            Authorization: phone,
            Token: uasToken
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);
            
            await apiPaymentSepa(details.current, false, {
                ...headers,
                Authorization: phone,
                Token: uasToken
            }).then((response)=>{
                if(md){                    
                    //@ts-ignore
                    if(response.data.status === "ok"){
                        handleCancel();
                        setRefresh();
                        displayHistory();
                        setContent({content: <ModalTrxStatusSuccess/>});
                    }
                }
                handleCancel();
            })
        })
    }

    return (
        <>
            <div className="mb-[30px] flex gap-[5px]">
                <IconApp color="#8F123A" size={15} className="min-w-[15px]" code="t27" />
                <span className={styles.ModalInfoText}>
                    {t("check_your_information_carefully")}
                </span>
            </div>
            <div className={`${styles.ModalRows} mb-[20px]`}>
                <div className="row">
                    <div className="col">
                        <span className={styles.ModalRowsTitle}>{t("type_transaction")}</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span className={styles.ModalRowsValue}>{label}</span>
                    </div>
                </div>
            </div>
            <Commissions
                isLoading={loading}
                youWillPay={new Decimal(amount).plus(withdraw_fee).toString()}
                youWillGet={amount}
                fee={new Decimal(withdraw_fee).toString()}
                youWillGetCoin={"EURG"}
            />
            <Form onSubmit={onConfirm}>
                <div className="row mt-4 mb-4">
                    <div className={styles.ButtonContainer}>
                        <Button
                                className={styles.ButtonTwo}
                                htmlType={"submit"}
                        >{t("confirm")}</Button>
                        <Button
                                skeleton
                                className={styles.ButtonTwo}
                                onClick={handleCancel}
                        >{t("cancel")}</Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default WithdrawConfirmBroker;
