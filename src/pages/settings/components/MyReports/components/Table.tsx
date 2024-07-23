import { useContext, useEffect, useState } from "react";

import { CtxRootData } from "@/processes/RootContext";
import { apiGetStatements, StatementsByIBAN } from "@/shared/api/statements";
import axios from "axios";
import { TableRow } from "./TableRow";
import useError from "@/shared/model/hooks/useError";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { UasConfirmCtx } from "@/processes/errors-provider-context";
import Loader from "@/shared/ui/loader";
import Button from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from './styles.module.scss'
import { Modal } from "@/shared/ui/modal/Modal";
import { apiGetUas } from "@/shared/(orval)api";
import { UASTokenApiResponse } from "@/shared/(orval)api/gek/model";

export function Table({
}: {
}) {
  const { account } = useContext(CtxRootData);

  const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError();
  const {uasToken, getUasToken} = useContext(UasConfirmCtx)
  const { getAccountDetails } = storeAccountDetails(state => state);
  const [statements, setStatements] = useState<{ [key: string]: StatementsByIBAN[] }>(null);
  const [reports, setReports] = useState<StatementsByIBAN[]>()
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [askModal, setAskModal] = useState<boolean>(false)
  const [silentCode, setSilentCode] = useState<UASTokenApiResponse>()

  const onClick = () => {
    navigate(-2);
  };

  const silentUas = async () => {
    const { data } = await apiGetUas({newtoken: false},{headers: { silent: true }});
    setSilentCode(data)

    return data
  }

  const getStatements = (token:string) => {
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      setAskModal(false)
      localErrorClear();

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

      setStatements(data?.statements);
    })();
  }

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    const cancelTokenSource = axios.CancelToken.source();

    const data = silentUas()

    data.then(data2 => {
      setSilentCode(data2)
      if(data2.result.token) {
        getStatements(data2.result.token)
      } else {
        setAskModal(true)
      }
    })

    return () => cancelTokenSource.cancel();
  }, []);

  const modalGetUas = async () => {
    getUasToken() 
  }
  useEffect(() => {
    if(uasToken) {
      getStatements(uasToken)
    }
  }, [uasToken, silentCode])

  useEffect(() => {
    if(statements) {
      const reportsF = statements[account?.number] ?? []
      setReports(reportsF)
      console.log('STATEMENTS', statements)
    }
  }, [statements])

  return (
    <div className='flex flex-col gap-[5px]'>
      <Modal
        title={t('code')}
        isModalOpen={askModal}
        onCancel={() => setAskModal(false)}
      >
        <p className={styles.ModalText}>
          To continue the operation, you need to receive an confirmation SMS code
        </p>
        <div className={styles.ModalBtnsWrap}>
        <Button color="green" className="w-full !max-w-[100%]" size="md" onClick={() => {
          setAskModal(false)
          modalGetUas()
        }} >
          {t('proceed')}
        </Button>
        <Button color="green" skeleton className="w-full !max-w-[100%]" size="md" onClick={() => {
          setAskModal(false)
          if(window.innerWidth < 768) navigate(-2)
        }} >
          {t('back')}
        </Button>
        </div>
      </Modal>
      {
        !reports ? (
          <Loader className="relative" />
        ) : (
          <>
            {reports.map(item => (
              <TableRow key={item.iban} statement={item} uasToken={uasToken} />
            ))}
          </>
        )
      }
      <div className={styles.ButtonWrap}>
            <Button className='mt-[5px] w-full' color='blue' onClick={onClick}>
              {t("back")}
            </Button>
          </div>
    </div>
  );
}
