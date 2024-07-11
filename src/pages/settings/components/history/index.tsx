import styles from './style.module.scss';
import { useLoginList } from './model/use-login-list';
import Loader from '@/shared/ui/loader';
import { t } from 'i18next';
import { getDate, getTimeAndTimeZone } from "./model/date-formaters";
import { getUnixTime, parseISO } from 'date-fns';
import { BoxWrapper } from '@/shared/ui/mobile-wrapper/mobile-wrapper';


export function LoginAndSignHistory() {
    const loginLogList = useLoginList();
    console.log(loginLogList);
    
    return (
        <BoxWrapper>
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
                <div className='relative w-full mt-32 flex justify-center min-h-[70px]'>
                    <Loader/>
                </div>
            )}
      </BoxWrapper>
    );
}