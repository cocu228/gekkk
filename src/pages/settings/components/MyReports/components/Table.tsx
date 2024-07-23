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

  const onClick = () => {
    navigate(-2);
  };

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    const cancelTokenSource = axios.CancelToken.source();

    if(uasToken && !reports) {
      (async () => {
        setAskModal(false)
        localErrorClear();
  
        const { phone } = await getAccountDetails();
        const { data } = await apiGetStatements({
          headers: {
            Authorization: phone,
            Token: uasToken
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
    } else if (!uasToken) {
      setAskModal(true)
    }

    return () => cancelTokenSource.cancel();
  }, [uasToken]);

  useEffect(() => {
    if(statements) {
      const reportsF = statements[account?.number] ?? []
      setReports(reportsF)
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
          To get reports you need to enter code from your mobile
        </p>
        <div className={styles.ModalBtnsWrap}>
        <Button color="blue" size="md" onClick={() => setAskModal(false)} >
          {t('back')}
        </Button>
        <Button color="green" size="md" onClick={() => {
          setAskModal(false)
          getUasToken()
        }} >
          {t('proceed')}
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
