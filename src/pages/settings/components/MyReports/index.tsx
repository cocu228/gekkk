import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Loader from "@/shared/ui/loader";
import { apiGetUas } from "@/shared/(orval)api";
import useError from "@/shared/model/hooks/useError";
import { StatementsByIBAN, apiGetStatements } from "@/shared/api/statements";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import Button from "@/shared/ui/button/Button";

import styles from "../../styles.module.scss";
import { AreaWrapper } from "../AreaWrapper";
import { Table } from "./components/Table";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

export function MyReports() {
  const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [uasToken, setUasToken] = useState<string>(null);
  const { getAccountDetails } = storeAccountDetails(state => state);
  const [statements, setStatements] = useState<{ [key: string]: StatementsByIBAN[] }>(null);

  const onClick = () => {
    navigate(-2);
  };

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


  return statements === null ? (
    <div className='w-full min-h-[100px]'>
      <Loader className='relative' />
    </div>
  ) : (
    <div className={styles.reportsWrap}>
      {localIndicatorError ? (
        <AreaWrapper title={t("my_reports")}>
          <p className={styles.reportsWarnText}>{localErrorInfoBox}</p>
        </AreaWrapper>
      ) : (
        <div className='flex flex-col'>
          <Table statements={statements} uasToken={uasToken} />
          <div className='w-full flex justify-center'>
            <Button className='mt-[5px] w-full' color='blue' onClick={onClick}>
              {t("back")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

}
