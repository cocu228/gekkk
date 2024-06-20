import { isNumber } from "@/shared/lib";
import styles from "../styles.module.scss";
import { useTranslation } from "react-i18next";
import { AddressTxOut } from "@/shared/(orval)api/gek/model";
import { formatDateTime } from "@/widgets/dashboard/model/helpers";

interface IGekReceipt {
    txId: number;
    data: AddressTxOut;
}
/*
0 = None,
1 = tx_inner,
2 = tx_in,
3 = tx_warning,
4 = tx_out,
5 = tx_in_system,
6 = tx_bank_in,
8 = tx_bank_out,
9 = tx_contract_transport,
10 = tx_only_info
*/

const GekReceipt = ({txId, data}: IGekReceipt) => {
    const { t } = useTranslation();
    
    return <>
        <div className={styles.Header}>
            <div className={styles.HeaderLogo}>
                <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
            </div>

            <div className={styles.HeaderTitle}>Payment Receipt</div>
            <div className={styles.HeaderId}>{txId}</div>
            <div className={styles.HeaderDate}>{!data?.created
                ? null
                : formatDateTime(new Date(data.created))
            }</div>
        </div>

        <span className={styles.InformationBlockTitle}/>

        <div className={styles.InformationBlock}>
            {/* Transaction type */}
            {/* {!data?.txType ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Transaction type</span>
                    <span className={styles.InformationBlockItemValue}>{data.txType}</span>
                </div>
            )} */}

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
            {/* {!data?.senderName ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Sender name</span>
                    <span className={styles.InformationBlockItemValue}>{data.senderName}</span>
                </div>
            )} */}

            {/* Address from */}
            {!data?.addressFrom ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Address from</span>
                    <span className={styles.InformationBlockItemValue}>{data.addressFrom}</span>
                </div>
            )}

            {/* Address to */}
            {!data?.addressTo ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Address to</span>
                    <span className={styles.InformationBlockItemValue}>{data.addressTo}</span>
                </div>
            )}

            {/* Token network */}
            {!data?.tokenNetwork ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Token network</span>
                    <span className={styles.InformationBlockItemValue}>{data.tokenNetwork}</span>
                </div>
            )}

            {/* Tx hash */}
            {!data?.txHash ? null : (
                <div className={styles.InformationBlockItem}>
                    <span className={styles.InformationBlockItemTitle}>Transaction
                        {isNumber(+data.txHash)
                            ? " number"
                            : " hash"
                        }
                    </span>

                    <span className={styles.InformationBlockItemValue}>{data.txHash}</span>
                </div>
            )}
        </div>

        <span className={styles.InformationBlockTitle}/>
    </>
}

export default GekReceipt