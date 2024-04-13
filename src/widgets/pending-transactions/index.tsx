import styles from './style.module.scss';
import InfoBox from "@/widgets/info-box";
import Modal from "@/shared/ui/modal/Modal";
import {useTranslation} from 'react-i18next';
import {apiGetUas} from "@/shared/(orval)api";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import {useContext, useEffect, useState} from "react";
import IconGkeOrange from "@/shared/ui/icons/IconGkeOrange";
import {formatCardNumber} from '../dashboard/model/helpers';
import BankCard from "../dashboard/ui/cards/bank-card/BankCard";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {IPendingTransaction, apiPendingTransactions} from "@/shared/api/bank/get-pending-transactions.ts";
import {apiSetPendingTxStatus} from '@/shared/api/bank/set-pending-tx-status.ts';
import {generateJWT, getTransactionSignParams} from '@/shared/lib/crypto-service';
import Loader from '@/shared/ui/loader';

export const PendingTransactions = () => {
    const {t} = useTranslation();
    const {refreshKey, account} = useContext(CtxRootData);
    const [uasToken, setUasToken] = useState<string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {showModal, isModalOpen, handleCancel} = useModal();
    const [state, setState] = useState<IPendingTransaction[]>([]);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const [selectedTx, setSelectedTx] = useState<IPendingTransaction>(null);

    useEffect(() => {
        (async () => {
            const {phone} = await getAccountDetails();
            const {data} = await apiGetUas();

            if (!(phone || data?.result?.token)) {
                return;
            }

            setUasToken(data.result.token);

            const response = await apiPendingTransactions({
                headers: {
                    Authorization: phone,
                    Token: data.result.token
                }
            });

            if (response.data) {
                setState(response.data);
            }
        })();
    }, [refreshKey, account]);

    const onContinue = async (isConfirm: boolean) => {
        setLoading(true);
        const {phone} = await getAccountDetails();

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

        // TODO: Test confirmations
        const response = await apiSetPendingTxStatus({
            body: {token},
            headers: {
                Authorization: phone,
                'X-App-uuid': appUuid,
                Token: uasToken
            }
        });

        console.log("3ds info:");
        console.log(response);
        // @ts-ignore
        if (!response.data.errors) {
            setState(() => [
                ...state.filter(tx => tx.reference !== selectedTx.reference),
            ]);
            setSelectedTx(null);
            handleCancel();
        }

        setLoading(false);
    }

    return state.length > 0 && <div>
        <InfoBox
            message={t("pending_transactions")}
            icon={<IconGkeOrange height={30} width={30}/>}
            onClick={() => {
                setSelectedTx(state[0]);
                showModal();
            }}
        />

        <Modal
            width={450}
            padding={false}
            open={isModalOpen}
            onCancel={handleCancel}
            closable={false}
            title={
                <div className={styles.TitleContainer}>
                    <span className={styles.Title}>
                        {t('please_verify_transaction')}
                    </span>

                    <svg onClick={handleCancel} className='cursor-pointer' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 6.5L13.5 13.5" stroke="#7B797C" stroke-width="2" stroke-linecap="round"/>
                        <path d="M6.5 13.5L13.5 6.50001" stroke="#7B797C" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="10" cy="10" r="9" stroke="#7B797C" stroke-width="2"/>
                    </svg>

                </div>
            }
        >
            <hr className={styles.ModalLine} />

            {loading && <Loader/>}

            {selectedTx && <div className={loading ? 'collapse' : ''}>
                <div className={styles.CardContainer}>
                    <BankCard
                        size='lg'
                        className={styles.Card}
                        cardNumber={formatCardNumber(selectedTx.pan)}
                        expiresAt={selectedTx.cardExpDate}
                        holderName={selectedTx.nameOnCard}
                    />
                </div>

                <div className={styles.Container}>
                    <div className={styles.CardEnding}>
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
                            greenTransfer
                            onClick={() => onContinue(true)}
                            className={styles.Button}
                            size='xl'
                        >
                            {t("confirm")}
                        </Button>

                        <Button
                            red
                            onClick={() => onContinue(false)}
                            className={styles.Button}
                            size='xl'
                            decline
                        >
                            {t("decline")}
                        </Button>
                    </div>
                </div>
            </div>}
        </Modal>
    </div>
}

export default PendingTransactions;
