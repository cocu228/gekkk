import { ActiveBonusProgram } from "@/shared/api/bank/deals/get-deals";
// import useModal from "@/shared/model/hooks/useModal";
import Button from "@/shared/ui/button/Button";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DealTurn } from "../model/helpers";
// import SmsCodeModal from "./SmsCodeModal";
import styles from './style.module.scss';


interface Props {
  cashbackId: ActiveBonusProgram;
  name: string;
  accrualPeriod: string;
  iconPath: string;
  className: string;
  conditions: Array<string>;
  isActive: boolean;
}

const CashbackCard = memo<Props>(({ cashbackId, name, accrualPeriod, className, iconPath, conditions, isActive }): JSX.Element => {
  const navigate = useNavigate();
  // const { isModalOpen, showModal, handleCancel } = useModal();

  const [isChecked, setChecked] = useState(false);

  const isCashbackCardGKE = cashbackId === ActiveBonusProgram.CASHBACK_GKE;

  return (
    <div className='flex mb-10 justify-center'>
      <div 
        className={` ${styles.CashbackCard} ${className} ${isActive && styles.CashbackCardActive}`}
      >
        <div className='flex'>
          <div className={styles.CashbackCardName}>
            {name}
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
                <img
                  className="w-7 h-7 mr-2"
                  src='/img/cashback/active-cashback.svg'
                />
                <span> You already use this option</span>
              </div>
            ) 
            : accrualPeriod
          }
        </div>

        <div className='mt-[23px]'>
            <Checkbox
              className={`bg-white ${(isActive || isCashbackCardGKE) ? 'hidden' : ''}`}
              onChange={() => setChecked(!isChecked)}
              disabled={isActive || isCashbackCardGKE}
              
            >
            <span className={`${styles.CashbackCardCheckbox} ${(isActive || isCashbackCardGKE) ? 'pl-0' : ''}`}>
                Bonus payments are a part of a loyalty program, provided by
                FINTECH ASSETS OÜ. Terms and Conditions can be found here
              </span>
            </Checkbox>
        </div>

        <div className={styles.CashbackCardButton}>
          <Button
            onClick={isCashbackCardGKE
              ? () => navigate('/wallet/GKE/Cashback Program') 
              // : () => showModal()
              : () => {}

            } 
            disabled={!isChecked && !isActive && !isCashbackCardGKE}

            className={`whitespace-nowrap ${!isCashbackCardGKE ? 'cursor-auto hover:!shadow-none active:!shadow-none active:!bg-none' : ''}`}
          >
            {isCashbackCardGKE
              ? 'Go to the program' 
              : !isActive 
                ? 'Activate' 
                // : 'Deactivate'
                : 'Activated'

            }
          </Button>
        </div>
      </div>

      <div className={styles.CashbackDescription}>
        <div className={styles.CashbackDescriptionTitle}>
          Conditions
        </div>

        <ul className={`list-disc ${styles.CashbackDescriptionList}`}>
          {conditions.map((condition, i) => (
            <li key={i}>
              {condition}
            </li>
          ))}
        </ul>
      </div>
      {/* {isModalOpen && 
        <SmsCodeModal 
          cashbackId={cashbackId} 
          isModalOpen={isModalOpen} 
          handleCancel={handleCancel} 
          action={!isActive ? 'start' : 'stop'} 
          />
      } */}
    </div>
  )
})


export default CashbackCard