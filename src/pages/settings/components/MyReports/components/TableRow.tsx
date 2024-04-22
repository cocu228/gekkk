import Download from '@/assets/download.svg?react';
import {useBreakpoints} from '@/app/providers/BreakpointsProvider';
import {StatementsByIBAN, apiDownloadStatements} from '@/shared/api/statements';
import {storeAccountDetails} from '@/shared/store/account-details/accountDetails';
import s from '../../../styles.module.scss'

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

    return <div className={`${!sm && s.reportTbRowCols} ${s.reportTbRow}`}>
        <span className={s.reportRowTitle}>
            {from} - {to}
        </span>

        {!sm && (
            <span className={s.reportRowSubTitle}>{reportName}</span>
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
        }} className={s.reportDownloadWrap}>
            <Download />
        </div>
    </div>
}
