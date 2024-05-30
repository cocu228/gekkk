import {forwardRef} from "react";
import {formatDateTime} from "@/widgets/dashboard/model/helpers";
import {isNumber} from "@/shared/lib";
import styles from "../../styles.module.scss";
import {AddressTxOut} from "@/shared/(orval)api/gek/model";

interface IGekPdfProps {
    state: AddressTxOut & {
        senderName?: string;
    } | null;
    txId: string;
    loading: boolean;
}

const Gek = forwardRef<HTMLDivElement | null, IGekPdfProps>(({state, txId, loading}, ref) => {
    return (
        <div ref={ref} className={styles.Block + (!loading ? '' : ' collapse')}>
            <div className={styles.Header}>
                <div className={styles.HeaderLogo}>
                    <img src="/img/icon/GekkardLogoReceipt.svg" alt="AlertIcon"/>
                </div>

                <div className={styles.HeaderTitle}>Payment Receipt</div>
                <div className={styles.HeaderId}>{txId}</div>
                <div className={styles.HeaderDate}>{!state?.created
                    ? null
                    : formatDateTime(new Date(state.created))
                }</div>
            </div>

            <span className={styles.InformationBlockTitle}/>
            <div className={styles.InformationBlock}>
                {/* TODO: text description Transaction type */}
                {!state?.txType ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Transaction type</span>
                        <span className={styles.InformationBlockItemValue}>{state.txType}</span>
                    </div>
                )}

                {/* Currency */}
                {!state?.currency ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Currency</span>
                        <span className={styles.InformationBlockItemValue}>{state.currency}</span>
                    </div>
                )}

                {/* Amount */}
                {!state?.amount ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Amount</span>
                        <span className={styles.InformationBlockItemValue}>{state.amount}</span>
                    </div>
                )}

                {/* Fee */}
                {!state?.fee ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Fee</span>
                        <span className={styles.InformationBlockItemValue}>{state.fee}</span>
                    </div>
                )}

                {/* Status */}
                {!state?.state_text ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Status</span>
                        <span className={styles.InformationBlockItemValue}>{state.state_text}</span>
                    </div>
                )}

                {/* Sender name */}
                {!state?.senderName ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Sender name</span>
                        <span className={styles.InformationBlockItemValue}>{state.senderName}</span>
                    </div>
                )}

                {/* Address from */}
                {!state?.addressFrom ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Address from</span>
                        <span className={styles.InformationBlockItemValue}>{state.addressFrom}</span>
                    </div>
                )}

                {/* Address to */}
                {!state?.addressTo ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Address to</span>
                        <span className={styles.InformationBlockItemValue}>{state.addressTo}</span>
                    </div>
                )}

                {/* Token network */}
                {!state?.tokenNetwork ? null : (
                    <div className={styles.InformationBlockItem}>
                        <span className={styles.InformationBlockItemTitle}>Token network</span>
                        <span className={styles.InformationBlockItemValue}>{state.tokenNetwork}</span>
                    </div>
                )}

                {/* Tx hash */}
                {!state?.txHash ? null : (
                    <div className={styles.InformationBlockItem}>
              <span className={styles.InformationBlockItemTitle}>Transaction
                  {isNumber(+state.txHash)
                      ? " number"
                      : " hash"
                  }
              </span>
                        <span className={styles.InformationBlockItemValue}>{state.txHash}</span>
                    </div>
                )}
            </div>

            <span className={styles.InformationBlockTitle}/>
        </div>
    )
})

export default Gek