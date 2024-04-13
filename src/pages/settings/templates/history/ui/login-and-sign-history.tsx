import { formatForHistoryMobile } from '@/shared/lib/date-helper';
import styles from './style.module.scss';
import { useState } from 'react';
import { UserLoginLog } from '@/shared/(orval)api/auth/model/userLoginLog';
import { useLoginList } from '../model/use-login-list';
import Loader from '@/shared/ui/loader';
import { formatDate } from '../../user-keys/model/date-formater';
import { t } from 'i18next';
import { Typography } from '@/shared/ui/typography/typography';
import { getDate, getTimeAndTimeZone } from "../model/date-formaters";
import { getUnixTime, parseISO } from 'date-fns';


export function LoginAndSignHistory() {
    const loginLogList = useLoginList();
    console.log(loginLogList);
    
    return (
        <div className={styles.historyWrap}>
        {loginLogList.map((login,index) =>
           <>
            {index === 0 || getDate(login.utc_time) !== getDate(loginLogList[index - 1].utc_time) ? (
                <div className={styles.DataMobile}>
                    {getDate(login.utc_time)}
                </div>
            ): null}
            <div className={styles.historyItem}>
                <h4 className={styles.historyItemTitle}>{getTimeAndTimeZone(getUnixTime(parseISO(login?.utc_time)))}</h4>
                <h4 className={styles.historyItemTitle}>{login.device_info}</h4>
                <h4 className={styles.historyItemTitle}>{t("ip")}: {login?.ip}</h4>
            </div>
           </>)
        }
        {!loginLogList.length && (
            <div className='relative mt-32'>
                <Loader/>
            </div>
        )}
      </div>
    );
}