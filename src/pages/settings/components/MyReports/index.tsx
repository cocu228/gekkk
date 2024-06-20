import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Loader from "@/shared/ui/loader";
import { apiGetUas } from "@/shared/(orval)api";
import useError from "@/shared/model/hooks/useError";
import { StatementsByIBAN, apiGetStatements } from "@/shared/api/statements";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";

import styles from "../../styles.module.scss";
import { AreaWrapper } from "../AreaWrapper";
import { Table } from "./components/Table";

export function MyReports() {
  const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();
  const { t } = useTranslation();
  const [uasToken, setUasToken] = useState<string>(null);
  const { getAccountDetails } = storeAccountDetails(state => state);
  const [statements, setStatements] = useState<{ [key: string]: StatementsByIBAN[] }>(null);

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      localErrorClear();

      const token = (await apiGetUas()).data.result.token;
      setUasToken(token);

      const { phone } = await getAccountDetails();
      const { data } = await apiGetStatements({
        headers: {
          Authorization: phone,
          Token: token
        },
        cancelToken: cancelTokenSource.token
      });

      if (data.errors) {
        localErrorHunter({
          code: data.errors.code,
          message: `Loading Report issue #${data.errors.code}`
        });
        return;
      }

      setStatements(data.statements);
    })();

    return () => cancelTokenSource.cancel();
  }, []);

  return (
    <div className={styles.reportsWrap}>
      {statements === null ? (
        <AreaWrapper title={t("my_reports")}>
          <p className={styles.reportsWarnText}>
            <Loader className='relative' />
          </p>
        </AreaWrapper>
      ) : localIndicatorError ? (
        <AreaWrapper title={t("my_reports")}>
          <p className={styles.reportsWarnText}>{localErrorInfoBox}</p>
        </AreaWrapper>
      ) : (
        <AreaWrapper title={t("my_reports")} nonClose={true}>
          <Table statements={statements} uasToken={uasToken} />
        </AreaWrapper>
      )}
    </div>
  );
}
