import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { formatForCustomer, formatForHistoryMobile, formatForHistoryTimeMobile } from "@/shared/lib/date-helper";
import Button from "@/shared/ui/button/Button";
import GTable from "@/shared/ui/grid-table/";
import { storeListTxCode } from "@/shared/store/tx-codes/list-tx-code";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import { Modal } from "@/shared/ui/modal/Modal";
import useModal from "@/shared/model/hooks/useModal";
import { apiApplyCode } from "@/shared/(orval)api/gek";
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

  const [loading, setLoading] = useState(false);
  const getListTxCode = storeListTxCode(state => state.getListTxCode);
  const [localErrorHunter, localErrorInfoBox] = useError();
  const [success, setSuccess] = useState(null);
  const { md } = useBreakpoints();
  const { showModal, isModalOpen, handleCancel } = useModal();
  const onBtnConfirm = async (code: string) => {
    setLoading(true);
    const response = await apiApplyCode({
      code: code
    });

    actionResSuccess(response)
      .success(async () => setSuccess(true))
      .reject(localErrorHunter);

    showModal();

    setLoading(false);
  };

  useEffect(() => {
    if (success && !isModalOpen) {
      (async () => {
        await getListTxCode();
      })();
    }
  }, [isModalOpen]);

  const modalKeys = {
    code: code,
    date: `${formatForHistoryMobile(date)} at ${formatForHistoryTimeMobile(date)}`,
    amount: `${amount} ${currency}`
  };

  return (
    <>
      {loading ? (
        <div className='w-full h-full relative'>
          <Loader />
        </div>
      ) : (
        <Button className='w-full' size='sm' skeleton onClick={() => onBtnConfirm(code)}>
          {t("confirm")}
        </Button>
      )}
      <Modal placeBottom={md} onCancel={handleCancel} isModalOpen={isModalOpen} title={t("the_code_confirmed")}>
        {localErrorInfoBox ? (
          localErrorInfoBox
        ) : (
          <div>
            <div className='flex flex-col px-[10px] gap-[25px] mb-[30px]'>
              <div className='flex flex-col gap-[10px]'>
                {modalDateArray.map(item => (
                  <div key={item.key}>
                    <p className='text-[#9D9D9D] md:text-fs12 text-fs14'>{t(item.titleKey)}</p>
                    <p className='font-semibold text-[#3A5E66] md:text-fs12 text-fs14'>{modalKeys[item.key]}</p>
                  </div>
                ))}
              </div>
            </div>
            <ConfirmButtons
              onConfirm={() => {
                onBtnConfirm(code);
                handleCancel();
              }}
              onCancel={handleCancel}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

const TransferTableCode = ({ isOwner = false }: { isOwner?: boolean; inputCurr?: IUseInputState }) => {
  const currency = useContext(CtxWalletData);
  const listTxCode = storeListTxCode(state => state.listTxCode);
  const getListTxCode = storeListTxCode(state => state.getListTxCode);
  const { md, lg } = useBreakpoints();

  useEffect(() => {
    (async () => {
      await getListTxCode();
    })();
  }, [currency.$const]);

  const filteredListTxCode = listTxCode.filter(
    item => (item.currency as constants) === currency.$const && item.isOwner === isOwner
  );
  const { t } = useTranslation();

  return listTxCode.length === 0 ? null : (
    <GTable className={`${styles.Table}`}>
      <GTable.Head className={styles.TableHead}>
        <GTable.Row className={styles.TableHeadBody}>
          {/* {
                    tableHeads.map((item, ind) => (
                        <GTable.Col key={ind} className={styles.CodeModalTitle}>
                            <div data-text={item.capitalize()}>
                                <span>{t(item)}</span>
                            </div>
                        </GTable.Col>
                    ))
                } */}
          <GTable.Col className={styles.CodeModalTitle}>
            <div data-text={"Code"}>
              <span>{t("code")}</span>
            </div>
          </GTable.Col>
          <GTable.Col className={styles.CodeModalTitle}>
            <div data-text={"Amount"}>
              <span>{t("amount")}</span>
            </div>
          </GTable.Col>
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
        {filteredListTxCode.length > 0 ? (
          filteredListTxCode.map(it => {
            const visiblyConfirm = it.stateCode === 3 && it.typeTx === 12 && it.isOwner;
            return (
              <GTable.Row key={it.code} className='px-4 py-3 gap-3'>
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
                      {md ? (
                        <span className={styles.CodeTime}>
                          {formatForHistoryMobile(it.dateTxUTC)} at {formatForHistoryTimeMobile(it.dateTxUTC)}
                        </span>
                      ) : (
                        <span className={styles.CodeTime}>{formatForCustomer(it.dateTxUTC)}</span>
                      )}
                    </div>
                  </div>
                  <span className={styles.MobileAmount}>
                    {it.amount} {currency.$const}
                  </span>
                </GTable.Col>

                {!md && !lg && (
                  <GTable.Col className='text-center'>
                    <span className='text-gra-600 text-xs'>{it.amount}</span>
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
          })
        ) : (
          <div className={styles.Row}>
            <span>{t("no_have_transfer_code")}</span>
          </div>
        )}
      </GTable.Body>
    </GTable>
  );
};

export default TransferTableCode;
