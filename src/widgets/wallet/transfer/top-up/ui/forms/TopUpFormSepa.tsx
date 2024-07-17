import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { CtxRootData } from "@/processes/RootContext";
import CopyIcon from "@/shared/ui/copy-icon/CopyIcon";

// import {storeOrganizations} from "@/shared/store/organizations";
import styles from "./style.module.scss";

const TopUpFormSepa = () => {
  // const organizations = storeOrganizations(state => state.organizations);
  const { account } = useContext(CtxRootData);
  const { t } = useTranslation();

  return (
    <div className='wrapper'>
      <div className={styles.Sepa}>
          <span className={styles.SepaTitle}>{t("account_for_top_up")}:</span>
          <div className={styles.SepaValueWrapper}>
            <div className={styles.SepaValueWrapperSecond}>
              <span className={styles.SepaValue}>{account.number}</span>
              <div>
                <CopyIcon value={account.number} />
              </div>
            </div>
        </div>
      </div>
      <div className={styles.Sepa}>
          <span className={styles.SepaTitle}>{t("recipient")}:</span>
          <div className={styles.SepaValueWrapper}>
            <div className={styles.SepaValueWrapperSecond}>
              <span className={styles.SepaValue}>{account.name}</span>
              <CopyIcon value={account.name} />
            </div>
          </div>
      </div>
      <div className={styles.Sepa}>
        <span className={styles.SepaTitle}>{t("the_beneficiary_bank")}:</span>
        <div className={styles.SepaValueWrapper}>
          <div className={styles.SepaValueWrapperSecond}>
            <span className={styles.SepaValue}>Papaya Ltd</span>
            <CopyIcon value={"Papaya Ltd"} />
          </div>
        </div>
      </div>
      <div className={styles.Sepa}>
          <span className={styles.SepaTitle}>{t("bic_of_beneficiary_bank")}:</span>
          <div className={styles.SepaValueWrapper}>
            <div className={styles.SepaValueWrapperSecond}>
              <span className={styles.SepaValue}>PAPYMTMTXXX</span>
              <CopyIcon value={"PAPYMTMTXXX"} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default TopUpFormSepa;
