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


export function LoginAndSignHistory() {
    const loginLogList = useLoginList();
    console.log(loginLogList);
    
    return (
        <div className='flex flex-col gap-4 w-full items-center'>
        {loginLogList.map((login,index) =>
           <>
            {index === 0 || getDate(login.utc_time) !== getDate(loginLogList[index - 1].utc_time) ? (
                <div className={styles.DataMobile}>
                    {getDate(login.utc_time)}
                </div>
            ): null}
            <div className={'substrate substrate w-full rounded-lg flex flex-col'}>
                <Typography variant='h' color='light-green'>{getTimeAndTimeZone(login?.utc_time)}</Typography>
                <Typography variant='h' color='light-green'>{login.device_info}</Typography>
                <Typography variant='h' color='light-green'>{t("ip")}: {login?.ip}</Typography>
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