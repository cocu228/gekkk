import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import { ActiveBonusProgram } from "@/shared/api/bank/deals";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";

interface Props {
  cashbackId: ActiveBonusProgram;
  name: string;
  accrualPeriod: string;
  icon: React.ReactNode;
  className: string;
  modalColor: string;
  conditions: Array<string>;
  isActive: boolean;
}

const CashbackCardMobile = memo<Props>(({ cashbackId, name, accrualPeriod, className, icon, conditions, isActive }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isChecked] = useState(false);

  const toCashbackProgram = cashbackId === ActiveBonusProgram.CASHBACK1;
  const toNoFeeProgram = cashbackId === ActiveBonusProgram.CASHBACK_FIAT;

  return (
    <div className='flex flex-col relative pb-[40px] justify-center'>
      <div
        className={` ${styles.CashbackCardMobile} ${className} ${isActive && styles.CashbackCardMobileActive}`}
        onClick={showModal}
      >
        <div className='flex'>
          <div className={styles.CashbackCardName}>{t(name)}</div>
        </div>

        <div className={styles.CashbackCardIcon}>{icon}</div>

        <div className={styles.CashbackCardAccrualPeriod}>
          {isActive ? (
            <div className='flex items-center'>
              <IconApp code='t57' color='#77A45C' size={28} className='mr-2' />
              <span>{t("cashback_programs.already_use")}</span>
            </div>
          ) : (
            t(accrualPeriod)
          )}
        </div>

        <div className='mt-[23px]'>
          <div
            className={`${styles.CashbackCardCheckbox} ${
              isActive || toNoFeeProgram || toCashbackProgram ? "pl-0" : ""
            }`}
          >
            {t("cashback_programs.bonus_description")}
          </div>
        </div>
      </div>

      <div className='flex flex-col relative justify-between -mx-4 -mb-4'>
        <div className={styles.CashbackCardButtonContainerMobile}>
          {(toNoFeeProgram || toCashbackProgram) && (
            <Button
              color='blue'
              className={`${styles.CashbackCardButton}`}
              disabled={!isChecked && !isActive && !(toNoFeeProgram || toCashbackProgram)}
              onClick={
                toNoFeeProgram
                  ? () => navigate("/wallet?currency=GKE&tab=no_fee_program")
                  : () => navigate("/wallet?currency=GKE&tab=cashback_program")
              }
            >
              <div className='flex flex-row'>
                {(toNoFeeProgram || toCashbackProgram) && t("cashback_programs.go_to_the_program")}
              </div>
            </Button>
          )}
        </div>
        <div className={`${styles.CashbackDescription} ${styles.CashbackDescriptionMobile}`}>
          <div className={`${styles.CashbackDescriptionTitle} ${styles.CashbackDescriptionTitleMobile}`}>
            {t("cashback_programs.conditions")}
          </div>

          <ul className={`list-disc ${`${styles.CashbackDescriptionList} ${styles.CashbackDescriptionListMobile}`} `}>
            {conditions.map(condition => (
              <li key={condition}>{t(condition)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default CashbackCardMobile;
