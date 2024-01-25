import InfoBox from "@/widgets/info-box";
import Modal from "@/shared/ui/modal/Modal";
import GTable from "@/shared/ui/grid-table";
import {useTranslation} from 'react-i18next';
import {CtxRootData} from "@/processes/RootContext";
import InfoContent from "../history/ui/InfoContent";
import useModal from "@/shared/model/hooks/useModal";
import {actionResSuccess} from "@/shared/lib/helpers";
import {useContext, useEffect, useState} from "react";
import {formatForCustomer} from "@/shared/lib/date-helper";
import styles from "@/widgets/history/ui/style.module.scss";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {apiGetHistoryTransactions} from "@/shared/(orval)api/gek";
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";
import {GetHistoryTrasactionOut} from "@/shared/(orval)api/gek/model";

export const UnconfirmedTransactions = () => {
    const {t} = useTranslation();
    const {refreshKey, account} = useContext(CtxRootData);
    const {showModal, isModalOpen, handleCancel} = useModal();
    const [state, setState] = useState<GetHistoryTrasactionOut[]>([]);
    
    useEffect(() => {
        (async () => {
            const response = await apiGetHistoryTransactions({
                currencies: null,
                end: null,
                start: null,
                next_key: null,
                tx_types: [3],
                limit: 10
            });
            
            actionResSuccess(response).success(() => {
                const {result} = response.data
                setState(result.filter(item => item.partner_info === ""))
            });
        })();
    }, [refreshKey, account]);
    
    const isOnceInfo = state.length === 1;
    const titleModal = isOnceInfo
        ? t("transaction_info")
        : t("unconfirmed_incoming_transactions");
    const content = isOnceInfo
        ? <InfoContent handleCancel={handleCancel} {...state[0]}/>
        : <UnConfTrxList trx={state}/>;
    
    return state.length > 0 && <div className="negative-margin-content">
        <InfoBox>
            <span className="font-semibold">{t("unconfirmed_transactions")} <span
                className="text-blue-400 underline hover:cursor-pointer" onClick={showModal}>{t("here")}</span></span>
        </InfoBox>

        <Modal
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            title={titleModal}
        >
            {content}
        </Modal>
    </div>
}

const UnConfTrxList = ({trx}: {trx: GetHistoryTrasactionOut[]}) => {
    const {currencies} = useContext(CtxCurrencies);
    
    return <GTable>
        <GTable.Head className={styles.TableHead}>
            <GTable.Row>
                {['Date', 'Flow of funds'].map(label =>
                    <GTable.Col className="text-start">
                        <div className='ellipsis ellipsis-md' data-text={label}>
                            <span>{label}</span>
                        </div>
                    </GTable.Col>
                )}
            </GTable.Row>
        </GTable.Head>
        <GTable.Body className={styles.TableBody}>
            {trx.map((item) => (
                <GTable.Row cols={2} className={styles.Row + ' hover:font-medium'}>
                    <TransactionInfo infoList={item}>
                        <GTable.Col>
                            <div className="ellipsis ellipsis-md">
                                <span>{formatForCustomer(item.datetime)}</span>
                            </div>
                        </GTable.Col>
                        
                        <GTable.Col>
                            <div>
                                <span className={`${item.is_income ? 'text-green' : 'text-red-800'}`}>
                                    {!item.is_income && '-'}
                                    {Number(item.amount).toFixed(currencies.get(item.currency)?.roundPrec)} {item.currency}
                                </span>
                            </div>
                        </GTable.Col>
                    </TransactionInfo>
                </GTable.Row>
            ))}
        </GTable.Body>
    </GTable>
}

export default UnconfirmedTransactions;
