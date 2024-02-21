import Decimal from "decimal.js";
import {AxiosResponse} from "axios";
import Loader from "@/shared/ui/loader";
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from "react";
import useError from "@/shared/model/hooks/useError";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";
import {formatForCustomer} from "@/shared/lib/date-helper";
import InfoConfirmPartner from "@/widgets/history/ui/InfoConfirmPartner";
import {actionResSuccess, asteriskText, isNull} from "@/shared/lib/helpers";
import {AdrTxTypeEnum, GetHistoryTrasactionOut} from "@/shared/(orval)api/gek/model";
import {AddressTxOut} from "@/shared/(orval)api/gek/model";
import {apiAddressTxInfo} from "@/shared/(orval)api/gek";

type TypeProps = GetHistoryTrasactionOut & {
    handleCancel: () => void
}

const InfoContent = (props: TypeProps) => {
    const {t} = useTranslation();
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
                    tx_id: +props.id_transaction
                });
                
                actionResSuccess(response)
                    .success(() => setState(response.data.result))
                    .reject(localErrorHunter);
            })();
        }
    }, [props.id_transaction]);
    
    return <> {localErrorInfoBox ? localErrorInfoBox : loading ? <Loader/> : <>
        <div className="mb-8">
        <div className="row mb-4 flex flex-wrap gap-2">
            <div className="col">
                <span className="text-gray-500 font-medium">{t("date")}:</span>
            </div>
            <div className="col font-medium">
                <span className="text-gray-600">{formatForCustomer(props.datetime)}</span>
            </div>
        </div>
            <div className="row mb-4 flex flex-nowrap gap-2 items-center">
            <div className="col w-auto">
                <span className="text-gray-500 leading-4 font-medium">{t("transaction_id")}:</span>
            </div>
            <div className="col w-auto font-medium flex items-center">
                <span className="leading-4 font-medium">{asteriskText(props.id_transaction)}</span>
            </div>
                <div className="col flex items-center"><CopyIcon value={props.id_transaction}/></div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2 items-center">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">{t("transaction_type")}:</span>
            </div>
            <div className="col w-auto font-medium">
                <span>{props.tx_type_text}</span>
            </div>
        </div>
        <div className="row mb-4 flex flex-wrap gap-2 items-center">
            <div className="col w-auto">
                <span className="text-gray-500 font-medium">{t("currency")}:</span>
            </div>
            <div className="col w-auto font-medium">
                <span>{props.currency}</span>
            </div>
        </div>
            <div className="row mb-4 flex flex-wrap gap-2 items-center">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">{t("amount")}:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{props.amount} {props.currency}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2 items-center">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">{t("fee")}:</span>
                </div>
                <div className="col w-auto">
                    <span className="break-all font-medium">{new Decimal(props.fee).toString()} {props.currency}</span>
                </div>
            </div>
            <div className="row mb-4 flex flex-wrap gap-2 items-center">
                <div className="col w-auto">
                    <span className="text-gray-500 font-medium">{t("status")}:</span>
                </div>
                <div className="col w-auto flex items-center">
                    <span className="whitespace-nowrap font-medium">{props.status_text}</span>
                </div>
            </div>
            {props.tag && (
                <div className="row mb-4 flex flex-wrap gap-2 items-center">
                    <div className="col w-auto">
                        <span className="text-gray-500 font-medium">{t("description")}:</span>
                    </div>
                    <div className="col w-auto flex items-center">
                        <span className="whitespace-nowrap font-medium">{props.tag}</span>
                    </div>
                </div>
            )}
            {isNeedConfirm || (state?.txType === AdrTxTypeEnum[6] || state?.txType === AdrTxTypeEnum[8]) ? null :
                <div className="row mb-4 flex flex-wrap gap-2 items-center">
                    <div className="col w-auto">
                        <span className="text-gray-500 font-medium">{t("sender_name")}:</span>
                    </div>
                    <div className="col w-auto">
                        <span className="break-all font-medium">{props.partner_info}</span>
                    </div>
                </div>}
        </div>
        {state !== null && <>
            <div className="font-light">
                {(state.txType === AdrTxTypeEnum[6] || state.txType === AdrTxTypeEnum[8]) ? null : <div>
                    {state.addressFrom && <div className="row mb-4 flex flex-wrap gap-2 items-center">
                        <div className="col">
                            <span className="text-gray-500 font-medium">{t("address_from")}</span>
                        </div>
                        <div className="col flex items-center">
                            <span className="break-all font-medium">{asteriskText(state.addressFrom)}</span>
                        </div>
                        <div className="col flex items-center"><CopyIcon value={state.addressFrom}/></div>
                    </div>}
                    {state.addressTo && <div className="row mb-4 flex flex-wrap gap-2 items-center">
                        <div className="col w-auto">
                            <span className="text-gray-500 font-medium whitespace-nowrap">{t("address_to")}</span>
                        </div>
                        <div className="col w-auto flex items-center">
                            <span className="break-all font-medium">{asteriskText(state.addressTo)}</span>
                            <CopyIcon value={state.addressTo}/>
                        </div>
                    </div>}
                    {state.tokenNetwork && <div className="row mb-4 flex flex-wrap gap-2 items-center">
                        <div className="col w-auto">
                            <span className="text-gray-500 font-medium">{t("token_network")}</span>
                        </div>
                        <div className="col w-auto">
                            <span className="break-all font-medium">{state.tokenNetwork}</span>
                        </div>
                    </div>}
                </div>}
            {(state.txHash && state.explorerBaseAddress) && (
                <div className="row mb-4 flex flex-wrap gap-2 items-center">
                    <div className="col w-auto">
                        <span className="text-gray-500 font-medium">{t("transaction")}</span>
                    </div>
                    <div className="col w-auto flex items-center">
                        <a target={"_blank"} href={state.explorerBaseAddress + state.txHash}
                           className="break-all font-medium underline">{asteriskText(state.txHash)}</a>
                        <CopyIcon value={state.txHash}/>
                    </div>
                </div>
            )}
                {/*{state.state_text && <div className="row mb-4 flex flex-wrap gap-2">*/}
                {/*    <div className="col">*/}
                {/*        <span className="text-gray-500 font-normal">Status blockchain:</span>*/}
                {/*    </div>*/}
                {/*    <div className="col flex items-center">*/}
                {/*        <span className="break-all font-normal">{state.state_text}</span>*/}
                {/*    </div>*/}
                {/*</div>}*/}

            </div>
        </>}
        {isNeedConfirm && <InfoConfirmPartner {...props}/>}
    </>}
    </>
}

export default InfoContent;
