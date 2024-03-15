import styles from './style.module.scss';
import InfoBox from "@/widgets/info-box";
import Modal from "@/shared/ui/modal/Modal";
import {useTranslation} from 'react-i18next';
import {apiGetUas} from "@/shared/(orval)api";
import {actionResSuccess} from "@/shared/lib";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import {useContext, useEffect, useState} from "react";
import IconGkeOrange from "@/shared/ui/icons/IconGkeOrange";
import {formatCardNumber} from '../dashboard/model/helpers';
import BankCard from "../dashboard/ui/cards/bank-card/BankCard";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {IPendingTransaction, apiPendingTransactions} from "@/shared/api/bank/get-pending-transactions.ts";
import { apiSetPendingTxStatus } from '@/shared/api/bank/set-pending-tx-status.ts';
import { generateJWT, getTransactionSignParams } from '@/shared/lib/crypto-service';

export const PendingTransactions = () => {
    // TODO: Test transactions
    const {t} = useTranslation();
    const {refreshKey, account} = useContext(CtxRootData);
    const {showModal, isModalOpen, handleCancel} = useModal();
    const [state, setState] = useState<IPendingTransaction[]>([]);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const [selectedTx, setSelectedTx] = useState<IPendingTransaction>(null);

    /*
    {
        authenticationMethod: "BIO",
        cardApplication: "Gekkard",
        cardExpDate: "00/00",
        convertedAmount: 12,
        pan: "000000_0000",
        nameOnCard: "Ralf Williams",
        originalCurrency: 'EUR',
        originalAmount: 35.69,
        merchant: {
            id: "Wolt",
            name: "WOLT Delivery",
            countryCode: "EU",
            url: ''
        }
    }
    */

    useEffect(() => {
        (async () => {
            const {phone} = await getAccountDetails();
            const {data} = await apiGetUas();

            if (!(phone || data?.result?.token)) {
                return;
            }

            const response = await apiPendingTransactions({
                headers: {
                    Authorization: phone,
                    Token: data.result.token
                }
            });

            actionResSuccess(response).success(() => setState(response.data));
        })();
    }, [refreshKey, account]);

    const onContinue = async (isConfirm: boolean) => {
        const {phone} = await getAccountDetails();
        const {data} = await apiGetUas();

        const {
            appUuid,
            appPass
        } = await getTransactionSignParams();
        
        const jwtPayload = {
          initiator: phone,
          reference: selectedTx.reference,
          status: isConfirm ? 'APPROVED' : 'DECLINED',
          authenticationMethod: "BIO"//isBIO ? 'BIO' : 'PIN',
        };

        const token = generateJWT(jwtPayload, appPass);

        await apiSetPendingTxStatus({
            body: {token},
            headers: {
                Authorization: phone,
                'X-App-uuid': appUuid,
                Token: data.result.token
            }
        });


    }

    return state.length > 0 && <div className="negative-margin-content">
        <InfoBox
            message={t("pending_transactions")}
            onClick={showModal}
            icon={<IconGkeOrange height={30} width={30}/>}
        />

        {selectedTx && <Modal
            width={450}
            padding={false}
            open={isModalOpen}
            onCancel={handleCancel}
            title={t('please_verify_transaction')}
        >
            <div className={styles.CardContainer}>
                <BankCard
                    className={styles.Card}
                    cardNumber={formatCardNumber(selectedTx.pan)}
                    expiresAt={selectedTx.cardExpDate}
                    holderName={selectedTx.nameOnCard}
                />
            </div>

            <div className={styles.Container}>
                <div>
                    You have pending transaction with your card ending by {selectedTx.pan.slice(-4)}
                </div>

                <div className={styles.MerchantName}>
                    {selectedTx.merchant.name}
                </div>

                <div className={styles.Amount}>
                    {selectedTx.originalAmount} {selectedTx.originalCurrency}
                </div>

                <div>{t('click_confirm_to_verify')}</div>

                <div className="flex flex-1 justify-between">
                    <Button
                        onClick={() => onContinue(true)}
                        className={styles.Button}
                    >Confirm</Button>

                    <Button
                        red
                        onClick={() => onContinue(false)}
                        className={styles.Button}
                    >Decline</Button>
                </div>
            </div>
        </Modal>}
    </div>
}

export default PendingTransactions;

/*
async postPaymentVerification(info, status, isBIO?) {
  headers = (this.fbUAS.checkIfUAS(this.user.username) || localStorage.getItem('isResended')) ?
    headers.set('token', user.token) :
    headers.set('token-firebase', user.token);
  
  const token = this.encriptService.generateJWTToken({
    initiator: user.username,
    reference: info.reference,
    authenticationMethod: isBIO ? 'BIO' : 'PIN',
    status,
  });
  return this.http.post(`${environment.api}/acs3/transaction/status`, {token}, {headers}).toPromise();
}
*/
