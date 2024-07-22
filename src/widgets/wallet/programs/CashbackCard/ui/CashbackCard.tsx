import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@/shared/ui/button/Button";
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

const CashbackCard = memo<Props>(({ cashbackId, name, accrualPeriod, className, icon, conditions, isActive }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toCashbackProgram = cashbackId === ActiveBonusProgram.CASHBACK1;
  const toNoFeeProgram = cashbackId === ActiveBonusProgram.CASHBACK_FIAT;
  const toPartnershipProgram = cashbackId === ActiveBonusProgram.PARTNERSHIP;
  const toPartnershipEurg = cashbackId === ActiveBonusProgram.PARTNERSHIP_EURG;

  return (
    <div className='flex flex-col relative pb-[40px] justify-center'>
      <div className={`${styles.CashbackCardMobile} ${className} ${isActive && styles.CashbackCardMobileActive}`}>
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
            {toPartnershipProgram
              ? t("partnership_program.referal_info")
              : toPartnershipEurg
              ? t("partnership_program.eurg_referal_info")
              : t("cashback_programs.bonus_description")}
          </div>
        </div>
      </div>

      <div className='flex flex-col relative justify-between -mx-4 -mb-4'>
        <div className={styles.CashbackCardButtonContainerMobile}>
          {(toNoFeeProgram || toCashbackProgram || toPartnershipProgram || toPartnershipEurg) && (
            <Button
              color='blue'
              className={`${styles.CashbackCardButton}`}
              disabled={
                !isActive && !(toNoFeeProgram || toCashbackProgram || toPartnershipProgram || toPartnershipEurg)
              }
              onClick={() => {
                if (toNoFeeProgram) navigate("/wallet?currency=GKE&tab=no_fee_program");
                if (toCashbackProgram) navigate("/wallet?currency=GKE&tab=cashback_program");
                if (toPartnershipProgram || toPartnershipEurg) navigate("/partnership-program");
              }}
            >
              <div className='flex flex-row'>
                {(toNoFeeProgram || toCashbackProgram || toPartnershipProgram || toPartnershipEurg) &&
                  t("cashback_programs.go_to_the_program")}
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

export default CashbackCard;
