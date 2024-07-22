import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { StatementsByIBAN, apiDownloadStatements } from "@/shared/api/statements";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "../../../styles.module.scss";
import { useTranslation } from "react-i18next";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function TableRow({ uasToken, statement }: { uasToken: string; statement: StatementsByIBAN }) {
  const { sm } = useBreakpoints();
  const { getAccountDetails } = storeAccountDetails();
  const { from, downloadLink } = statement;
  const [year, month, day] = from.split('-'); 
  const {t} = useTranslation()

  const getMonthName = (monthNumber:number) => {
    return monthNames[monthNumber - 1];
  };

  function formatDate(date:string) {
    const [year, month, day] = date.split('-');
    
    return `${day}.${month}.${year}`;
  }

  const monthName = getMonthName(parseInt(month));


  return (
    <div className={`${!sm && styles.reportTbRowCols} ${styles.reportTbRow}`}>
      <span className={styles.reportRowTitle}>
        <span className="min-w-[65px] block">{formatDate(from)}</span> <span>{monthName} {t('monthly_report')}</span>
      </span>

      <div
        className={styles.reportDownloadWrap}
        onClick={async () => {
          const { phone } = await getAccountDetails();
    
          const response = await apiDownloadStatements(downloadLink, {
            headers: {
            Authorization: phone,
            Token: uasToken
            }
          });
    
          window.open(URL.createObjectURL(response.data));
        }}
          >
            <IconApp code='t44' size={13} color='currentColor' />
      </div>
    </div>
  );
}
