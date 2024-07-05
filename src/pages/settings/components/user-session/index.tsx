import styles from './style.module.scss';
import { UserSession as UserSessionT } from '@/shared/(orval)api/auth/model';
import Loader from '@/shared/ui/loader';
import { getDate, getTime } from "./model/date-formaters";
import { useSession } from './model/use-sessions';
import useModal from '@/shared/model/hooks/useModal';
import { useState } from 'react';
import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';
import { useTranslation } from 'react-i18next';
import Button from '@/shared/ui/button/Button';
import { Modal } from "@/shared/ui/modal/Modal";
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import { BoxWrapper } from '@/shared/ui/mobile-wrapper/mobile-wrapper';

export function UserSession() {
    const { t } = useTranslation();
    const { md } = useBreakpoints();
    const isCurrent = (index: number) => index === 0;
    const { isModalOpen, handleCancel, showModal } = useModal();
    const { sessions, closeAllSessions, closeSession } = useSession();
    const [sessionToRemove, setSessionToRemove] = useState<UserSessionT>()

    return (
        <>
            <BoxWrapper>
                {sessions.map((session, index) =>
                    <>
                        {index === 0 || getDate(session.utc_create) !== getDate(sessions[index - 1].utc_create) ? (
                            <div className={styles.DataMobile}>
                                {getDate(session.utc_create)}
                            </div>
                        ) : null}
                        <div className={styles.SessionItem}>
                            <div className={'flex flex-col'}>
                                <h4 className={styles.sessionItemTitle}>{getTime(getUnixTime(parseISO(session?.utc_create)))}</h4>
                                <h4 className={styles.sessionItemTitle}>{t("login_type")}: {session.login_type}</h4>
                                <h4 className={styles.sessionItemTitle}>{session.user_agent}</h4>
                                <h4 className={styles.sessionItemTitle}>{t("ip")}: {session.ip}</h4>
                            </div>
                            <Button
                                skeleton
                                color='red'
                                className='w-[75px]'
                                size={md ? 'sm' : 'md'}
                                disabled={isCurrent(index)}
                                onClick={() => {
                                    showModal()
                                    setSessionToRemove(session)
                                }}
                            >
                                <span className='capitalize'>{isCurrent(index) ? t("current") : t("close")}</span>
                            </Button>
                        </div>
                    </>)
                }
                {(sessions?.length > 1) &&
                    <div className='m-5 min-h-[45px]'>
                        <Button
                            size='lg'
                            color='red'
                            className={styles.EndSessionTitle}
                            onClick={() => {
                                closeAllSessions();
                            }}
                        >
                            {t("end_all_other_sessions")}
                        </Button>
                    </div>
                }
                {!sessions.length && (
                    <div className='relative w-full mt-32 flex justify-center min-h-[70px]'>
                        <Loader />
                    </div>
                )}
            </BoxWrapper>
            <Modal
                placeBottom={window.innerWidth < 768}
                isModalOpen={isModalOpen}
                title={t('close_session')}
                onCancel={handleCancel}
            >
                <span className={styles.CloseTitle}>
                    {t("close_session_warning")}
                </span>
                <div className={styles.ModalFooter}>
                    <>
                        <Button
                            skeleton
                            color='red'
                            className='w-full !max-w-[100%]'
                            onClick={() => {
                                closeSession(sessionToRemove);
                                handleCancel()
                            }}
                        >
                            {t("confirm")}
                        </Button>
                        <Button
                            skeleton
                            className='w-full !max-w-[100%]'
                            color='green'
                            onClick={() => {
                                setSessionToRemove(null)
                                handleCancel()
                            }}
                        >
                            {t("cancel")}
                        </Button>
                    </>
                </div>
            </Modal>
        </>
    );
}