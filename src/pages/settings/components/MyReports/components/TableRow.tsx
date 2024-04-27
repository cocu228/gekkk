import Download from '@/assets/download.svg?react';
import {useBreakpoints} from '@/app/providers/BreakpointsProvider';
import {StatementsByIBAN, apiDownloadStatements} from '@/shared/api/statements';
import {storeAccountDetails} from '@/shared/store/account-details/accountDetails';
import styles from '../../../styles.module.scss'

export function TableRow({
    uasToken,
    statement,
}: {
    uasToken: string;
    statement: StatementsByIBAN;
}) {
    const {sm} = useBreakpoints();
    const {getAccountDetails} = storeAccountDetails();
    const {
        to,
        from,
        reportName,
        downloadLink
    } = statement;

    return <div className={`${!sm && styles.reportTbRowCols} ${styles.reportTbRow}`}>
        <span className={styles.reportRowTitle}>
            {from} - {to}
        </span>

        {!sm && (
            <span className={styles.reportRowSubTitle}>{reportName}</span>
        )}
        <div onClick={async () => {
            const {phone} = await getAccountDetails();

            const response = await apiDownloadStatements(downloadLink, {
                headers: {
                    Authorization: phone,
                    Token: uasToken
                }
            });

            window.open(URL.createObjectURL(response.data));
        }} className={styles.reportDownloadWrap}>
            <Download />
        </div>
    </div>
}
