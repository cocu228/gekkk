import Decimal from "decimal.js";
import { AxiosResponse } from "axios";
import style from './style.module.scss';
import Loader from "@/shared/ui/loader";
import {useContext, useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { TxInfoProps } from "../../model/types";
import useError from "@/shared/model/hooks/useError";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import InfoConfirmPartner from "./InfoConfirmPartner";
import {apiAddressTxInfo} from "@/shared/(orval)api/gek";
import {formatForCustomer} from "@/shared/lib/date-helper";
import {actionResSuccess, isNull} from "@/shared/lib/helpers";
import {AddressTxOut, AdrTxTypeEnum} from "@/shared/(orval)api/gek/model";
import Button from "@/shared/ui/button/Button";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {CtxGlobalModalContext} from "@/app/providers/CtxGlobalModalProvider";
import ReceiptData from "@/widgets/receipt/receiptData";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";

const InfoContent = (props: TxInfoProps) => {
  const {md} = useBreakpoints();
  const { t } = useTranslation();
  const { setContent } = useContext(CtxGlobalModalContext);
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const [state, setState] = useState<AddressTxOut | null>(null);

  const isAvailableType = props.tx_type === 3 || props.tx_type === 4;
  const isNeedConfirm = props.tx_type === 3 && props.partner_info === "";
  const loading = isNull(state) && isAvailableType;

  const handleOnReceipt = () => {
    props.handleCancel()
    if (md) {
      // TODO: For Mobile Version
    } else {
      setContent({
        content: <ReceiptData txId={props.id_transaction}/>,
        title: 'Transaction receipt'
      })
    }
  }

  useEffect(() => {
    if (isAvailableType) {
      (async () => {
        setState(null);

        const response: AxiosResponse = await apiAddressTxInfo({
          tx_id: +props.id_transaction,
        });

        actionResSuccess(response)
          .success(() => setState(response.data.result))
          .reject(localErrorHunter);
      })();
    }
  }, [props.id_transaction]);

  return (
    <div className="min-h-[400px]">
      {localErrorInfoBox ? (
        localErrorInfoBox
      ) : loading ? (
        <Loader />
      ) : (
        <div className={style.ModalWrap}>
          <div className="">
            <div className={style.InfoItem}>
              <div>
                <span className={style.InfoItemTitle}>{t("date")}</span>
              </div>
              <div>
                <span className={style.InfoItemValue}>
                  {formatForCustomer(props.datetime)}
                </span>
              </div>
            </div>
            <div className={style.CopyBlock}>
              <div className={style.InfoItem}>
                <div className="col w-auto">
                  <span className={style.InfoItemTitle}>
                    {t("transaction_id")}
                  </span>
                </div>
                <div 
                  className={`${style.InfoItemValue} cursor-pointer`}
                  onClick={()=>{
                    navigator.clipboard.writeText(props.id_transaction)
                  }}    
                >
                  <span className={style.InfoItemAddress}>
                    {props.id_transaction}
                  </span>
                </div>
              </div>
              <CopyIcon value={props.id_transaction} />
            </div>
            <div className={style.InfoItem}>
              <div className="col w-auto">
                <span className={style.InfoItemTitle}>
                  {t("transaction_type")}
                </span>
              </div>
              <div>
                <span className={style.InfoItemValue}>{props.tx_type_text}</span>
              </div>
            </div>
            <div className={style.InfoItem}>
              <div className="col w-auto">
                <span className={style.InfoItemTitle}>
                  {t("currency")}
                </span>
              </div>
              <div>
                <span className={style.InfoItemValue}>{props.currency}</span>
              </div>
            </div>
            <div className={style.InfoItem}>
              <div>
                <span className={style.InfoItemTitle}>
                  {t("amount")}
                </span>
              </div>
              <div>
                <span className={style.InfoItemValue}>
                  {props.amount} {props.currency}
                </span>
              </div>
            </div>
            <div className={style.InfoItem}>
              <div>
                <span className={style.InfoItemTitle}>{t("fee")}</span>
              </div>
              <div>
                <span className={style.InfoItemValue}>
                  {new Decimal(props.fee).toString()} {props.currency}
                </span>
              </div>
            </div>
            <div className={style.InfoItem}>
              <div>
                <span className={style.InfoItemTitle}>
                  {t("status")}
                </span>
              </div>
              <div>
                <span className={style.InfoItemValue}>
                  {props.status_text}
                </span>
              </div>
            </div>
            {props.tag && (
              <div className={style.InfoItem}>
                <div>
                  <span className={style.InfoItemTitle}>
                    {t("description")}
                  </span>
                </div>
                <div>
                  <span className={style.InfoItemValue}>
                    {props.tag}
                  </span>
                </div>
              </div>
            )}
            {isNeedConfirm ||
            state?.txType === AdrTxTypeEnum[6] ||
            state?.txType === AdrTxTypeEnum[8] ? null : (
              <div className={style.InfoItem}>
                <div>
                  <span className={style.InfoItemTitle}>
                    {t("sender_name")}
                  </span>
                </div>
                <div>
                  <span className={style.InfoItemValue}>
                    {props.partner_info}
                  </span>
                </div>
              </div>
            )}
          </div>
          {state !== null && (
            <>
              <div className="font-light">
                {state.txType === AdrTxTypeEnum[6] ||
                state.txType === AdrTxTypeEnum[8] ? null : (
                  <div>
                    {state.addressFrom && (
                      <div className={style.CopyBlock}>
                        <div className={style.InfoItem}>
                          <div className="flex flex-col">
                            <div>
                              <span className={style.InfoItemTitle}>
                                {t("address_from")}
                              </span>
                            </div>
                            <div 
                              className="cursor-pointer"
                              onClick={()=>{
                                navigator.clipboard.writeText(state.addressFrom)
                              }}  
                            >
                              <span className={style.InfoItemAddress}>
                                {state.addressFrom}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CopyIcon value={state.addressFrom} />
                      </div>
                    )}
                    {state.addressTo && (
                      <div className={style.CopyBlock}>
                        <div className={style.InfoItem}>
                          <div>
                            <span className={style.InfoItemTitle}>
                              {t("address_to")}
                            </span>
                          </div>
                          <div 
                            className="cursor-pointer"
                            onClick={()=>{
                              navigator.clipboard.writeText(state.addressTo)
                            }}
                          >
                            <span className={style.InfoItemAddress}>
                              {state.addressTo}
                            </span>
                          </div>
                        </div>
                        <CopyIcon value={state.addressTo} />
                      </div>
                    )}
                    {state.tokenNetwork && (
                      <div className={style.InfoItem}>
                        <div>
                          <span className={style.InfoItemTitle}>
                            {t("token_network")}
                          </span>
                        </div>
                        <div>
                          <span className={style.InfoItemValue}>
                            {state.tokenNetwork}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {state.txHash && state.explorerBaseAddress && (
                  <div className={style.CopyBlock}>
                    <div className={style.InfoItem}>
                      <div>
                        <span className={style.InfoItemTitle}>
                          {t("transaction")}
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <a
                          target={"_blank"}
                          href={!isNaN(Number(state.txHash)) ? null : (state.explorerBaseAddress + state.txHash)}
                          className={style.InfoItemHash}
                        >
                          {state.txHash}
                        </a>
                      </div>
                    </div>
                    <CopyIcon value={state.txHash} />
                  </div>
                )}
              </div>
            </>
          )}
          {isNeedConfirm && <InfoConfirmPartner {...props} />}
          <div className={"w-full flex justify-between mt-3"}>
            <Button
                skeleton
                className='w-full'
                onClick={handleOnReceipt}
            >
              <IconApp size={20} code="t58" color="#2BAB72"/> {t("receipt")}
            </Button>
            <Button
                className='w-full'
                onClick={props.handleCancel}
            >
              {t("close")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoContent;
