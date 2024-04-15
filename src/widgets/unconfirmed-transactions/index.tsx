import InfoBox from "@/widgets/info-box";
import Modal from "@/shared/ui/modal/Modal";
import {useTranslation} from 'react-i18next';
import {CtxRootData} from "@/processes/RootContext";
import InfoContent from "../history/ui/InfoContent";
import useModal from "@/shared/model/hooks/useModal";
import {actionResSuccess} from "@/shared/lib/helpers";
import {useContext, useEffect, useState} from "react";
import IconGkeOrange from "@/shared/ui/icons/IconGkeOrange";
import {apiGetHistoryTransactions} from "@/shared/(orval)api/gek";
import {GetHistoryTrasactionOut} from "@/shared/(orval)api/gek/model";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

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
                const {result} = response.data;
                setState(result.filter(item => item.partner_info === ""))
            });
        })();
    }, [refreshKey, account]);

    return state.length > 0 && <div className="negative-margin-content">
        <InfoBox
            onClick={showModal}
            message={t("unconfirmed_transactions")}
            icon={<IconGkeOrange height={30} width={30}/>}
        />

        <Modal
            width={450}
            open={isModalOpen}
            onCancel={handleCancel}
            closable={false}
            title={<ModalTitle handleCancel={handleCancel} title={t("please_enter_sender_name")}/>}
        >
            <InfoContent handleCancel={handleCancel} {...state[0]}/>
        </Modal>
    </div>
}

export default UnconfirmedTransactions;
