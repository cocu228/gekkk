import InfoBox from "@/widgets/info-box";
import Modal from "@/shared/ui/modal/Modal";
import GTable from "@/shared/ui/grid-table";
import {apiHistoryTransactions, IResHistoryTransactions} from "@/shared/api";
import {CtxRootData} from "@/processes/RootContext";
import InfoContent from "../history/ui/InfoContent";
import useModal from "@/shared/model/hooks/useModal";
import {actionResSuccess} from "@/shared/lib/helpers";
import {useContext, useEffect, useState} from "react";
import {formatForCustomer} from "@/shared/lib/date-helper";
import styles from "@/widgets/history/ui/style.module.scss";
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";
import {CtxCurrencies} from "@/processes/CurrenciesContext";

export const UnconfirmedTransactions = () => {

    const [state, setState] = useState<IResHistoryTransactions[]>([]);
    const {refreshKey, account} = useContext(CtxRootData);
    const {showModal, isModalOpen, handleCancel} = useModal();


    useEffect(() => {
        (async () => {
            const response = await apiHistoryTransactions(
                null,
                null,
                null,
                [3],
                null,
                10
            )

            actionResSuccess(response).success(() => {
                const {result} = response.data
                setState(result.filter(item => item.partner_info === ""))
            })

        })()
    }, [refreshKey, account])

    const isOnceInfo = state.length === 1,
        titleModal = isOnceInfo ? "Transaction info"
            : "Unconfirmed incoming transactions",
        content = isOnceInfo ?
            <InfoContent handleCancel={handleCancel} {...state[0]}/> :
            <UnConfTrxList {...state}/>



    return state.length > 0 && <div className="negative-margin-content">
        <InfoBox>
            <span className="font-semibold">You have unconfirmed transactions. Please enter the sender's name <span
                className="text-blue-400 underline" onClick={showModal}>here.</span></span>
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

const UnConfTrxList = (state) => {

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
            {state.map((item) => {
                return (
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
                );
            })}
        </GTable.Body>
    </GTable>
}

export default UnconfirmedTransactions;
