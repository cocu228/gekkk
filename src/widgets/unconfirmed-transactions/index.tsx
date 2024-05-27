import InfoBox from "@/widgets/info-box";
import {useTranslation} from 'react-i18next';
import {IconApp} from "@/shared/ui/icons/icon-app";
import {CtxRootData} from "@/processes/RootContext";
import useModal from "@/shared/model/hooks/useModal";
import {actionResSuccess} from "@/shared/lib/helpers";
import {useContext, useEffect, useState} from "react";
import {apiGetHistoryTransactions} from "@/shared/(orval)api/gek";
import InfoContent from "../history/ui/tx-info-modal/InfoContent";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import {GetHistoryTrasactionOut} from "@/shared/(orval)api/gek/model";
import { Modal as ModalUi} from "@/shared/ui/ModalUi/Modal";

export const UnconfirmedTransactions = () => {
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const {setRefresh} = useContext(CtxRootData);
    const {refreshKey, account} = useContext(CtxRootData);
    const [state, setState] = useState<GetHistoryTrasactionOut[]>([]);
    const {showModal, isModalOpen, handleCancel: modalCancel} = useModal();

    useEffect(() => {
        (async () => {
            const response = await apiGetHistoryTransactions({
                currencies: null,
                awaitsInfoOnly: true,
                end: null,
                start: null,
                next_key: null,
                tx_types: [3],
                limit: 100
            });

            actionResSuccess(response).success(() => {
                const {result} = response.data;
                setState(result.filter(item => item.partner_info === ""))
            });
        })();
    }, [refreshKey, account]);

    function handleCancel() {
        setRefresh();
        modalCancel();
    }

    return state.length > 0 && (
        <div className={!md ? 'negative-margin-content' : ''}>
            <InfoBox
                onClick={showModal}
                message={t("unconfirmed_transactions")}
                icon={<IconApp code="t62" color={'var(--gek-orange)'} size={30}/>}
            />

            <ModalUi
                isModalOpen={isModalOpen}
                onCancel={handleCancel}
                title={t('please_enter_sender_name')}
            >
                <InfoContent
                    {...state[0]}
                    handleCancel={() => {
                        const result = state.filter((_, index) => index !== 0);
                        setState([...result]);

                        if (result.length === 0) {
                            handleCancel();
                        }
                    }}
                />
            </ModalUi>
        </div>
    );
}

export default UnconfirmedTransactions;
