import { formatForHistoryMobile } from '@/shared/lib/date-helper';
import styles from './style.module.scss';
import { UserSession as UserSessionT } from '@/shared/(orval)api/auth/model';
import Loader from '@/shared/ui/loader';
import { Typography } from '@/shared/ui/typography/typography';
import { getDate, getTime } from "../model/date-formaters";
import { useSession } from '../model/use-sessions';
import { MobileButton } from '@/shared/ui/mobile-button/mobile-button';
import useModal from '@/shared/model/hooks/useModal';
import { useState } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import parseISO from 'date-fns/parseISO';
import getUnixTime from 'date-fns/getUnixTime';
import { formatDate } from '../../user-keys/model/date-formater';
import { useTranslation } from 'react-i18next';
import ModalTitle from '@/shared/ui/modal/modal-title/ModalTitle';


export function UserSession() {
    const {sessions, closeAllSessions, closeSession} = useSession();
    const isCurrent =(index:number) => index === 0;
    const {isModalOpen, handleCancel, showModal} = useModal();
    const [sessionToRemove, setSessionToRemove] = useState<UserSessionT>()
    const {t} = useTranslation()
    console.log(sessions);
    

    return (
        <>
        
                <div className={styles.sessionWrap}>
                    {sessions.map((session,index) =>
                    <>
                        {index === 0 || getDate(session.utc_create) !== getDate(sessions[index - 1].utc_create) ? (
                            <div className={styles.DataMobile}>
                                {getDate(session.utc_create)}
                            </div>
                        ): null}
                        <div className='substrate substrate w-full rounded-lg flex flex-row justify-between items-center'>
                            <div className={'flex flex-col'}>
                                <h4 className={styles.sessionItemTitle}>{getTime(getUnixTime(parseISO(session?.utc_create)))}</h4>
                                <h4 className={styles.sessionItemTitle}>{t("login_type")}: {session.login_type}</h4>
                                <h4 className={styles.sessionItemTitle}>{session.user_agent}</h4>
                                <h4 className={styles.sessionItemTitle}>{t("ip")}: {session.ip}</h4>
                            </div>
                            <MobileButton 
                                varitant={isCurrent(index) ? 'disabeled' : 'alarm'}  
                                className={styles.button}
                                onClick={()=>{
                                    showModal()
                                    setSessionToRemove(session)
                                }}
                            >
                                <span className='capitalize'>{isCurrent(index) ? t("current") : t("close")}</span>
                            </MobileButton>
                        </div>
                    </>)
                    }
                    {(sessions?.length > 1) &&
                    <div className='m-5 min-h-[45px]'>
                        <MobileButton
                            className='h-full p-2'
                            varitant='alarm'
                            onClick={()=>{
                                closeAllSessions();
                            }}
                        >
                            {t("end_all_other_sessions")}
                        </MobileButton>
                    </div>
                    }
                    {!sessions.length && (
                        <div className='relative mt-32'>
                            <Loader/>
                        </div>
                    )}
                </div>
                <Modal
                closable={false}
                open={isModalOpen}
                title={<ModalTitle handleCancel={handleCancel} title={t("close_session")}/>}
                width={400}
                footer={
                    <div className='w-full flex justify-center gap-2'>
                    <> 
                    <MobileButton
                        onClick={()=>{
                        closeSession(sessionToRemove);
                        handleCancel()
                        }}
                        >
                        {t("close")}
                    </MobileButton>
                    <MobileButton
                        onClick={()=>{
                        setSessionToRemove(null)
                        handleCancel()
                        }}
                    >
                        {t("cancel")}
                    </MobileButton> 
                    </>
                    </div>
                }
            >
                <span>
                    {t("close_session_warning")}
                </span>
            </Modal>
        </>
    );
}