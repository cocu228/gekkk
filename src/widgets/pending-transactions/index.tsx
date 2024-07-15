import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import { apiGetUas } from "@/shared/(orval)api";
import Button from "@/shared/ui/button/Button";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxRootData } from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import InfoBox from "@/widgets/info-box";
import Loader from "@/shared/ui/loader";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { apiSetPendingTxStatus } from "@/shared/api/bank/set-pending-tx-status";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { generateJWT, getTransactionSignParams } from "@/shared/lib/crypto-service";
import { IPendingTransaction, apiPendingTransactions } from "@/shared/api/bank/get-pending-transactions";
import { Modal } from "@/shared/ui/modal/Modal";

import { formatCardNumber } from "../dashboard/model/helpers";
import styles from "./style.module.scss";
import BankCard from "../dashboard/ui/cards/bank-card/BankCard";

const PendingTransactions = () => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  const { refreshKey, account } = useContext(CtxRootData);
  const [uasToken, setUasToken] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showModal, isModalOpen, handleCancel } = useModal();
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [state, setState] = useState<IPendingTransaction[]>([]);
  const [uasRequired, setUasRequired] = useState<boolean>(false);
  const { getAccountDetails } = storeAccountDetails(state => state);
  const [selectedTx, setSelectedTx] = useState<IPendingTransaction>(null);

  useEffect(() => {
    (async () => {
      if (!uasRequired) {
        const { phone } = await getAccountDetails();
        const { data } = uasToken
          ? { data: { result: { token: uasToken } } }
          : await apiGetUas(
              {
                newtoken: false
              },
              {
                headers: { silent: true }
              }
            );

        if (!(phone && data?.result?.token)) {
          setUasRequired(true);
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
      }
    })();
  }, [refreshKey, account, uasRequired]);

  const onInfoBox = async () => {
    setLoading(true);

    if (!uasRequired) {
      setSelectedTx(state[0]);
      showModal();
    } else {
      const { data } = await apiGetUas();

      if (data?.result?.token) {
        setUasRequired(false);
        setUasToken(data.result.token);
      }
    }

    setLoading(false);
  };

  const onContinue = async (isConfirm: boolean) => {
    setTxLoading(true);
    const { phone } = await getAccountDetails();

    const { appUuid, appPass } = await getTransactionSignParams(phone, uasToken);

    const jwtPayload = {
      initiator: phone,
      reference: selectedTx.reference,
      status: isConfirm ? "APPROVED" : "DECLINED",
      authenticationMethod: "BIO" //isBIO ? 'BIO' : 'PIN',
    };

    const token = generateJWT(jwtPayload, appPass);

    const response = await apiSetPendingTxStatus({
      body: { token },
      headers: {
        Authorization: phone,
        "X-App-uuid": appUuid,
        Token: uasToken
      }
    });

    // @ts-ignore
    if (!response.data.errors) {
      setState(() => [...state.filter(tx => tx.reference !== selectedTx.reference)]);
      setSelectedTx(null);
      handleCancel();
    }

    setTxLoading(false);
  };

  return (
    (state.length > 0 || uasRequired) && (
      <div className={!md ? "negative-margin-content" : ""}>
        <InfoBox
          onClick={onInfoBox}
          className={loading ? styles.LoadingInfoBox : ""}
          message={uasRequired ? t("pending_transactions_disabled") : t("pending_transactions")}
          icon={
            <IconApp
              size={30}
              code='t40'
              className={styles.LoadingInfoBox}
              color={`var(${loading ? "--gek-green" : "--gek-orange"})`}
            />
          }
        />

        <Modal isModalOpen={isModalOpen} onCancel={handleCancel} title={t("please_verify_transaction")}>
          {txLoading && <Loader className='mb-5' />}

          {selectedTx && (
            <div className={txLoading ? "collapse" : ""}>
              <div className={styles.CardContainer}>
                <BankCard
                  cardNumber={formatCardNumber(selectedTx.pan)}
                  expiresAt={selectedTx.cardExpDate}
                  holderName={selectedTx.nameOnCard}
                />
              </div>

              <div className={styles.Container}>
                <div className={styles.CardEnding}>
                  You have pending transaction with your card ending by {selectedTx.pan.slice(-4)}
                </div>

                <div className={styles.MerchantName}>{selectedTx.merchant.name}</div>

                <div className={styles.Amount}>
                  {selectedTx.originalAmount} {selectedTx.originalCurrency}
                </div>

                <div>{t("click_confirm_to_verify")}</div>

                <div className='flex flex-1 justify-between'>
                  <Button onClick={() => onContinue(true)} className={styles.Button}>
                    {t("confirm")}
                  </Button>

                  <Button color='red' onClick={() => onContinue(false)} className={styles.Button}>
                    {t("decline")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    )
  );
};

export default PendingTransactions;
