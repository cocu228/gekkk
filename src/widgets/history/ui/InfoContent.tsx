import Decimal from "decimal.js";
import { AxiosResponse } from "axios";
import Loader from "@/shared/ui/loader";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import useError from "@/shared/model/hooks/useError";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import { formatForCustomer } from "@/shared/lib/date-helper";
import InfoConfirmPartner from "@/widgets/history/ui/InfoConfirmPartner";
import { actionResSuccess, isNull } from "@/shared/lib/helpers";
import {
  AdrTxTypeEnum,
  GetHistoryTrasactionOut,
} from "@/shared/(orval)api/gek/model";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";
import { apiAddressTxInfo } from "@/shared/(orval)api/gek";

type TypeProps = GetHistoryTrasactionOut & {
  handleCancel: () => void;
};

const InfoContent = (props: TypeProps) => {
  const { t } = useTranslation();
  const [localErrorHunter, , localErrorInfoBox] = useError();
  const [state, setState] = useState<AddressTxOut | null>(null);
  const isAvailableType = props.tx_type === 3 || props.tx_type === 4;
  const isNeedConfirm = props.tx_type === 3 && props.partner_info === "";
  const loading = isNull(state) && isAvailableType;

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
    <>
      {" "}
      {localErrorInfoBox ? (
        localErrorInfoBox
      ) : loading ? (
        <Loader />
      ) : (
        <div className="px-[5%]">
          <hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#DCDCD9]" />

          <div className="">
            <div className="row mb-2 flex flex-col">
              <div className="col">
                <span className="font-bold text-[10px] text-[#285E69]">{t("date")}:</span>
              </div>
              <div className="col font-medium">
                <span className="font-normal text-xs text-[#29354C]">
                  {formatForCustomer(props.datetime)}
                </span>
              </div>
            </div>
            <div className="row mb-2 flex flex-nowrap items-center">
              <div className="flex flex-col">
                <div className="col w-auto">
                  <span className="font-bold text-[10px] text-[#285E69]">
                    {t("transaction_id")}:
                  </span>
                </div>
                <div 
                  className="col w-auto font-medium flex items-center cursor-pointer"
                  onClick={()=>{
                    navigator.clipboard.writeText(props.id_transaction)
                  }}    
                >
                  <span className="font-normal text-xs text-[#29354C]">
                    {props.id_transaction}
                  </span>
                </div>
              </div>
            </div>
            <div className="row mb-2 flex flex-col flex-wrap">
              <div className="col w-auto">
                <span className="font-bold text-[10px] text-[#285E69]">
                  {t("transaction_type")}:
                </span>
              </div>
              <div className="col w-auto font-medium">
                <span className="font-normal text-xs text-[#29354C]">{props.tx_type_text}</span>
              </div>
            </div>
            <div className="row mb-2 flex flex-col flex-wrap ">
              <div className="col w-auto">
                <span className="font-bold text-[10px] text-[#285E69]">
                  {t("currency")}:
                </span>
              </div>
              <div className="col w-auto font-medium">
                <span className="font-normal text-xs text-[#29354C]">{props.currency}</span>
              </div>
            </div>
            <div className="row mb-2 flex flex-wrap flex-col">
              <div className="col w-auto">
                <span className="font-bold text-[10px] text-[#285E69]">
                  {t("amount")}:
                </span>
              </div>
              <div className="col w-auto">
                <span className="font-normal text-xs text-[#29354C]">
                  {props.amount} {props.currency}
                </span>
              </div>
            </div>
            <div className="row mb-2 flex flex-wrap flex-col">
              <div className="col w-auto">
                <span className="font-bold text-[10px] text-[#285E69]">{t("fee")}:</span>
              </div>
              <div className="col w-auto">
                <span className="font-normal text-xs text-[#29354C]">
                  {new Decimal(props.fee).toString()} {props.currency}
                </span>
              </div>
            </div>
            <div className="row mb-2 flex flex-wrap flex-col">
              <div className="col w-auto">
                <span className="font-bold text-[10px] text-[#285E69]">
                  {t("status")}:
                </span>
              </div>
              <div className="col w-auto flex items-center">
                <span className="font-normal text-xs text-[#29354C]">
                  {props.status_text}
                </span>
              </div>
            </div>
            {props.tag && (
              <div className="row mb-2 flex flex-wrap flex-col">
                <div className="col w-auto">
                  <span className="font-bold text-[10px] text-[#285E69]">
                    {t("description")}:
                  </span>
                </div>
                <div className="col w-auto flex items-center">
                  <span className="font-normal text-xs text-[#29354C]">
                    {props.tag}
                  </span>
                </div>
              </div>
            )}
            {isNeedConfirm ||
            state?.txType === AdrTxTypeEnum[6] ||
            state?.txType === AdrTxTypeEnum[8] ? null : (
              <div className="row mb-2 flex flex-wrap items-center">
                <div className="col w-auto">
                  <span className="font-bold text-[10px] text-[#285E69]">
                    {t("sender_name")}:
                  </span>
                </div>
                <div className="col w-auto">
                  <span className="break-all font-medium">
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
                      <div className="row mb-2 flex flex-wrap ">
                        <div className="flex flex-col">
                          <div className="col">
                            <span className="font-bold text-[10px] text-[#285E69]">
                              {t("address_from")}
                            </span>
                          </div>
                          <div 
                            className="col flex items-center cursor-pointer"
                            onClick={()=>{
                              navigator.clipboard.writeText(state.addressFrom)
                            }}  
                          >
                            <span className="font-normal text-xs text-[#29354C]">
                              {state.addressFrom}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {state.addressTo && (
                      <div className="row mb-2 flex flex-wrap items-center">
                        <div className="flex flex-col">
                          <div className="col w-auto">
                            <span className="font-bold text-[10px] text-[#285E69]">
                              {t("address_to")}
                            </span>
                          </div>
                          <div 
                            className="col w-auto flex items-center cursor-pointer"
                            onClick={()=>{
                              navigator.clipboard.writeText(state.addressTo)
                            }}
                          >
                            <span className="font-normal text-xs text-[#29354C]">
                              {state.addressTo}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {state.tokenNetwork && (
                      <div className="row mb-2 flex flex-wrap flex-col">
                        <div className="col w-auto">
                          <span className="font-bold text-[10px] text-[#285E69]">
                            {t("token_network")}
                          </span>
                        </div>
                        <div className="col w-auto">
                          <span className="font-normal text-xs text-[#29354C]">
                            {state.tokenNetwork}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {state.txHash && state.explorerBaseAddress && (
                  <div className="row mb-2 flex flex-wrap items-center">
                    <div className="flex flex-col">
                      <div className="col w-auto">
                        <span className="font-bold text-[10px] text-[#285E69]">
                          {t("transaction")}
                        </span>
                      </div>
                      <div 
                        className="col w-auto flex items-center cursor-pointer"
                      >
                        <a
                          target={"_blank"}
                          href={state.explorerBaseAddress + state.txHash}
                          className="font-normal text-xs text-[#29354C] underline"
                        >
                          {state.txHash}
                        </a>
                      </div>
                    </div>
                    <CopyIcon value={state.txHash} />
                  </div>
                )}
                {/*{state.state_text && <div className="row mb-4 flex flex-wrap ">*/}
                {/*    <div className="col">*/}
                {/*        <span className="text-gray-500 font-normal">Status blockchain:</span>*/}
                {/*    </div>*/}
                {/*    <div className="col flex items-center">*/}
                {/*        <span className="break-all font-normal">{state.state_text}</span>*/}
                {/*    </div>*/}
                {/*</div>}*/}
              </div>
            </>
          )}
          {isNeedConfirm && <InfoConfirmPartner {...props} />}
        </div>
      )}
    </>
  );
};

export default InfoContent;
