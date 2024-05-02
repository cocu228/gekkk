import { memo, useState } from "react";
import styles from './style.module.scss';
import Button from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ActiveBonusProgram } from "@/shared/api/bank/deals/get-deals";
import { IconApp } from "@/shared/ui/icons/icon-app";


interface Props {
  cashbackId: ActiveBonusProgram;
  name: string;
  accrualPeriod: string;
  iconPath: string; 
  className: string;
  conditions: Array<string>;
  isActive: boolean;
}

const CashbackCard = memo<Props>(({
  cashbackId,
  name,
  accrualPeriod,
  className,
  iconPath,
  conditions,
  isActive
}): JSX.Element => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState(false);

  const toCashbackProgram = cashbackId === ActiveBonusProgram.CASHBACK1;
  const toNoFeeProgram = cashbackId === ActiveBonusProgram.CASHBACK_FIAT;

  return (
    <div className='flex mb-10 justify-center relative'>
      <div className={` ${styles.CashbackCard} ${className} ${isActive && styles.CashbackCardActive}`}>
        <div className='flex'>
          <div className={styles.CashbackCardName}>
            {t(name)}
          </div>

          <img
            className={styles.CashbackCardImage}
            src={iconPath}
          />
        </div>

        <div className={styles.CashbackCardAccrualPeriod}>
          {isActive 
            ? (
              <div className="flex items-center">
                <IconApp code="t57" color="#77A45C" size={28} className="mr-2" />   
                <span>{t("cashback_programs.already_use")}</span>
              </div>
            ) 
            : t(accrualPeriod)
          }
        </div>

        <div className='mt-[23px]'>
            <span className={`${styles.CashbackCardCheckbox} ${(isActive || (toNoFeeProgram || toCashbackProgram)) ? 'pl-0' : ''}`}>
              {t("cashback_programs.bonus_description")}
            </span> 
        </div>

        <div className={styles.CashbackCardButtonContainer}>
          {(toNoFeeProgram || toCashbackProgram) && (
            <Button
              custom
              className={`${styles.CashbackCardButton} ${!(toNoFeeProgram || toCashbackProgram)
                ? 'cursor-auto hover:!shadow-none active:!shadow-none active:!bg-none'
                : ''}
              `}
              disabled={!isChecked && !isActive && !(toNoFeeProgram || toCashbackProgram)}
              onClick={toNoFeeProgram
                ? () => navigate('/wallet?currency=GKE&tab=no_fee_program') 
                : () => navigate('/wallet?currency=GKE&tab=cashback_program')
              }
            >
              <div className='flex flex-row'>
                <div className='flex items-center mr-2 ml-2'>
                  <IconApp color='#3A5E66' size={10} code='t08' />
                </div>
                {(toNoFeeProgram || toCashbackProgram) && t("cashback_programs.go_to_the_program")}
              </div>
            </Button>
          )}
        </div>
      </div>

      <div className={styles.CashbackDescription}>
        <div className={styles.CashbackDescriptionTitle}>
          {t("cashback_programs.conditions")}
        </div>

        <ul className={`list-disc ${styles.CashbackDescriptionList}`}>
          {conditions.map((condition, i) => (
            <li key={i}>
              {t(condition)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})


export default CashbackCard