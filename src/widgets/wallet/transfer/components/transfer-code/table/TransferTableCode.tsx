import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { formatForCustomer, formatForHistoryMobile, formatForHistoryTimeMobile } from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import GTable from "@/shared/ui/grid-table/";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import { Modal } from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import { apiApplyCode, apiListTxCodes } from "@/shared/(orval)api/gek";
import Loader from "@/shared/ui/loader";
import { actionResSuccess } from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { IUseInputState } from "@/shared/ui/input-currency/model/useInputState";
import ConfirmButtons from "@/widgets/wallet/transfer/components/confirm-buttons";
import constants from "@/shared/config/coins/constants";

import CancelContent from "./CancelContent";
import CodeTxInfo from "../CodeTxInfo";
import styles from "./style.module.scss";
import { TxCodesOut } from "@/shared/(orval)api/gek/model";
import { CtxRootData } from "@/processes/RootContext";
import { CtxGlobalModalContext } from "@/app/providers/CtxGlobalModalProvider";
import ModalTrxStatusSuccess from "../../../withdraw/ui/modals/ModalTrxStatusSuccess";

export const modalDateArray = [
  {
    titleKey: "transaction_code",
    key: "code"
  },
  {
    titleKey: "date",
    key: "date"
  },
  {
    titleKey: "amount",
    key: "amount"
  }
];

const CodeModalInfo = ({ code, item }) => {
  const { showModal, isModalOpen, handleCancel } = useModal();
  const { t } = useTranslation();

  const payInfoInpValue = item.amount;

  return (
    <>
      <span onClick={showModal} className={styles.CodeModalTitle}>
        {code}
      </span>

      <Modal title={t("your_transfer_code")} isModalOpen={isModalOpen} onCancel={handleCancel}>
        <CodeTxInfo currency={item.currency} onClose={handleCancel} inputCurr={payInfoInpValue} code={code} />
      </Modal>
    </>
  );
};

const CodeModalConfirm = ({ code, amount, currency, date = null }) => {
  const { t } = useTranslation();
  const { md } = useBreakpoints();
  
  const [loading, setLoading] = useState(false);
  const { setRefresh } = useContext(CtxRootData);
  const { showModal, isModalOpen, handleCancel } = useModal();
  const { setContent: setGlobalModal } = useContext(CtxGlobalModalContext);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  
  const onBtnConfirm = async (code: string) => {
    setLoading(true);
    const response = await apiApplyCode({
      code: code
    });

    actionResSuccess(response)
      .success(() => {
        handleCancel();
        setRefresh();
        setGlobalModal({
          content: <ModalTrxStatusSuccess/>
        });
      })
      .reject(localErrorHunter);

    setLoading(false);
  };

  const onCancel = () => {
    handleCancel();
    localErrorClear();
  }

  const modalKeys = {
    code: code,
    date: `${formatForHistoryMobile(date)} at ${formatForHistoryTimeMobile(date)}`,
    amount: `${amount} ${currency}`
  };

  return (
    <>
      {loading ? (
        <div className='w-full h-full relative min-h-[100px]'>
          <Loader />
        </div>
      ) : (
        <Button className='w-full' size='sm' skeleton onClick={showModal}>
          {t("confirm")}
        </Button>
      )}
      <Modal placeBottom={md} onCancel={onCancel} isModalOpen={isModalOpen} title={t("confirm_code")}>
        <div className='flex flex-col px-[10px] gap-[25px] mb-5'>
          <div className='flex flex-col gap-[10px]'>
            {modalDateArray.map(item => (
              <div key={item.key}>
                <p className='text-[#9D9D9D] md:text-fs12 text-fs14'>{t(item.titleKey)}</p>
                <p className='font-semibold text-[#3A5E66] md:text-fs12 text-fs14'>{modalKeys[item.key]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">{localErrorInfoBox}</div>

        <ConfirmButtons
          isConfirmDisabled={loading || !!localErrorInfoBox}
          onConfirm={() => onBtnConfirm(code)}
          onCancel={onCancel}
        />
      </Modal>
    </>
  );
};

const TransferTableCode = ({ isOwner = false }: { isOwner?: boolean; }) => {
  const { lg, xl, xxl } = useBreakpoints();
  const currency = useContext(CtxWalletData);
  const { refreshKey } = useContext(CtxRootData);
  const [txCodes, setTxCodes] = useState<TxCodesOut[]>([]);
  const [compactRequired, setCompactRequired] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await apiListTxCodes({currency: currency.$const});

      if (!response?.data?.error) {
        setTxCodes(response.data.result);
      }
    })();
  }, [refreshKey]);

  useEffect(() => {
    setCompactRequired(xxl && (lg == xl));
  }, [lg, xl, xxl])

  const filteredListTxCode = txCodes.filter(
    item => (item.currency as constants) === currency.$const && item.isOwner === isOwner
  );
  const { t } = useTranslation();

  return txCodes.length === 0 ? null : (
    <>
      {filteredListTxCode.length <= 0 ? (
        <div className={styles.Row}>
          <span>{t("no_have_transfer_code")}</span>
        </div>
      ) : (
        <GTable className={`${styles.Table}`}>
          <GTable.Head className={styles.TableHead}>
            <GTable.Row className={styles.TableHeadBody}>
              <GTable.Col className={styles.CodeModalTitle}>
                <div data-text={"Code"}>
                  <span>{t("code")}</span>
                </div>
              </GTable.Col>
              {!compactRequired && (
                <GTable.Col className={styles.CodeModalTitle}>
                  <div data-text={"Amount"}>
                    <span>{t("amount")}</span>
                  </div>
                </GTable.Col>
              )}
              <GTable.Col className={styles.CodeModalTitle}>
                <div data-text={"Status"}>
                  <span>{t("status")}</span>
                </div>
              </GTable.Col>
              <GTable.Col className={styles.CodeModalTitle}>
                <div data-text={"Action"}>
                  <span>{t("action")}</span>
                </div>
              </GTable.Col>
            </GTable.Row>
          </GTable.Head>
          <GTable.Body className={styles.TableBody}>
            {filteredListTxCode.map((it, index) => {
              const visiblyConfirm = it.stateCode === 3 && it.typeTx === 12 && it.isOwner;
              return (
                <GTable.Row key={`TX_CODE_ROW_${index}`} className={styles.TableItem}>
                  <GTable.Col className='w-full'>
                    <div className='row flex w-full items-center pr-[6px]'>
                      <div className='col pr-[15px] w-full'>
                        <CodeModalInfo item={it} code={it.code} />
                      </div>
                      <div className={styles.CopyIcon}>
                        <CopyIcon value={it.code} />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                        {compactRequired ? (
                          <span className={styles.CodeTime}>
                            {formatForHistoryMobile(it.dateTxUTC)} at {formatForHistoryTimeMobile(it.dateTxUTC)}
                          </span>
                        ) : (
                          <span className={styles.CodeTime}>{formatForCustomer(it.dateTxUTC)}</span>
                        )}
                      </div>
                    </div>
                    {compactRequired && (
                      <span className={styles.AmountRow}>
                        {it.amount} {currency.$const}
                      </span>
                    )}
                  </GTable.Col>

                  {!compactRequired && (
                    <GTable.Col className='text-center'>
                      <span className='text-gra-600 text-xs'>{it.amount} {currency.$const}</span>
                    </GTable.Col>
                  )}

                  <GTable.Col className={styles.StatusCol}>
                    <span className='text-gray-600 text-xs'>{it.state}</span>
                  </GTable.Col>

                  <GTable.Col className={styles.ActionCol}>
                    {visiblyConfirm ? (
                      <CodeModalConfirm code={it.code} amount={it.amount} currency={it.currency} />
                    ) : (
                      <CancelContent
                        code={it.code}
                        amount={it.amount}
                        currency={it.currency}
                        confirm={it.typeTx === 12}
                      />
                    )}
                  </GTable.Col>
                </GTable.Row>
              );
            })}
          </GTable.Body>
        </GTable>
      )}
    </>
  );
};

export default TransferTableCode;
