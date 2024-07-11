import styles from "../styles.module.scss";
import { useTranslation } from "react-i18next";
import { AddressTxOut, GetHistoryTrasactionOut } from "@/shared/(orval)api/gek/model";
import { formatDateTime } from "@/widgets/dashboard/model/helpers";
import { isNumbersOnly } from "@/shared/lib";

export type IGekRecepit = GetHistoryTrasactionOut & {
    addressTxInfo?: AddressTxOut | null;
};

const GekReceipt = (data: IGekRecepit) => {
    const { t } = useTranslation();
    
    return <>
        <div className={styles.Header}>
            <div className={styles.HeaderLogo}>
                <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
            </div>

            <div className={styles.HeaderTitle}>Payment Receipt</div>
            <div className={styles.HeaderId}>{data.id_transaction}</div>
            <div className={styles.HeaderDate}>{!data?.datetime
                ? null
                : formatDateTime(new Date(data.datetime))
            }</div>
        </div>

        <span className={styles.InformationBlockTitle}/>

        <div className={styles.InformationBlock}>
            {/* Transaction type */}
            {!data?.tx_type_text ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Transaction type</span>
                    <span className={styles.InformationBlockItemValue}>{data.tx_type_text}</span>
                </div>
            )}

            {/* Currency */}
            {!data?.currency ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Currency</span>
                    <span className={styles.InformationBlockItemValue}>{data.currency}</span>
                </div>
            )}

            {/* Amount */}
            {!data?.amount ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Amount</span>
                    <span className={styles.InformationBlockItemValue}>{data.amount} {data.currency}</span>
                </div>
            )}

            {/* Fee */}
            {!data?.fee ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Fee</span>
                    <span className={styles.InformationBlockItemValue}>{data.fee} {data.currency}</span>
                </div>
            )}

            {/* Sender name */}
            {!data?.partner_info ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Sender name</span>
                    <span className={styles.InformationBlockItemValue}>{data.partner_info}</span>
                </div>
            )}

            {!data?.addressTxInfo ? null : <>
                {/* Address from */}
                {!data.addressTxInfo?.addressFrom ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Address from</span>
                        <span className={styles.InformationBlockItemValue}>{data.addressTxInfo.addressFrom}</span>
                    </div>
                )}

                {/* Address to */}
                {!data.addressTxInfo?.addressTo ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Address to</span>
                        <span className={styles.InformationBlockItemValue}>{data.addressTxInfo.addressTo}</span>
                    </div>
                )}

                {/* Token network */}
                {!data.addressTxInfo?.tokenNetwork ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Token network</span>
                        <span className={styles.InformationBlockItemValue}>{data.addressTxInfo.tokenNetwork}</span>
                    </div>
                )}

                {/* Tx hash */}
                {!data.addressTxInfo?.txHash ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>
                            Transaction {isNumbersOnly(data.addressTxInfo.txHash)
                                ? "number"
                                : "hash"}
                        </span>
                        <span className={styles.InformationBlockItemValue}>{data.addressTxInfo.txHash}</span>
                    </div>
                )}
            </>}
        </div>

        {!data?.status_text ? null : (
            <div className={styles.Footer}>
                <div className={styles.Status}>
                    <span>{!data?.status_text ? null : data.status_text}</span>
                </div>
            </div>
        )}
    </>
}

export default GekReceipt;
