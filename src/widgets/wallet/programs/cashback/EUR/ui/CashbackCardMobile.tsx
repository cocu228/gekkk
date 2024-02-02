import { ActiveBonusProgram } from '@/shared/api/bank/deals';
import useModal from '@/shared/model/hooks/useModal';
import Button from '@/shared/ui/button/Button';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Modal from '@/shared/ui/modal/Modal';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import SmsCodeModal from './SmsCodeModal';
import styles from './style.module.scss';
import SvgComponent from '@/shared/ui/icons/IconSchema';

interface Props {
  cashbackId: ActiveBonusProgram,
  name: string;
  accrualPeriod: string;
  iconPath: string;
  className: string;
  modalColor: string;
  conditions: Array<string>;
  isActive: boolean;
}

const CashbackCardMobile = memo<Props>(({ cashbackId, name, accrualPeriod, className, modalColor, iconPath, conditions, isActive }) => {
  const navigate = useNavigate();
  const { isModalOpen, showModal, handleCancel } = useModal();
  // const { isModalOpen: isSmsModalOpen, showModal: showSmsModal, handleCancel: handleSmsCancel } = useModal();

  const [isChecked, setChecked] = useState(false);

  const toNoFeeProgram = cashbackId === ActiveBonusProgram.CASHBACK_FIAT;
  const toCashbackProgram = cashbackId === ActiveBonusProgram.CASHBACK1;


  return (
    <div className='flex flex-col relative pb-20 justify-center'>
      <div 
        className={` ${styles.CashbackCardMobile} ${className} ${isActive && styles.CashbackCardMobileActive}`}
        onClick={showModal}
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
            <span className={`${styles.CashbackCardCheckbox} ${(isActive || (toNoFeeProgram || toCashbackProgram)) ? 'pl-0' : ''}`}>
              Bonus payments are a part of a loyalty program, provided by 
              ADVENTARIUM PTE. LTD. Terms and Conditions can be found here
            </span> 
        </div>
        
      </div>

          
          <div className='flex flex-col justify-between -mx-4 -mb-4'>
            <div className={styles.CashbackDescription +" " + styles.CashbackDescriptionMobile}>
              <div className={styles.CashbackDescriptionTitle +" " + styles.CashbackDescriptionTitleMobile}>
                Conditions
              </div>

              <ul className={`list-disc ${styles.CashbackDescriptionList+" "+ styles.CashbackDescriptionListMobile} `}>
                {conditions.map((condition, i) => (
                  <li key={i}>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
           
            <div className='mx-[30px]'>
            
              
            
            </div>
          </div>
      {/* {isSmsModalOpen &&
        <SmsCodeModal
          cashbackId={cashbackId}
          isModalOpen={isSmsModalOpen}
          handleCancel={handleSmsCancel}
          action={!isActive ? 'start' : 'stop'}
        />
      } */}
      <div className={styles.CashbackCardButton + " " + styles.CashbackCardButtonMobile}>
          {(toNoFeeProgram || toCashbackProgram) && 
            <Button
              program
              onClick={toNoFeeProgram
                ? () => navigate('/wallet/GKE/no_fee_program') 
                // : () => showModal()
                : () => navigate('/wallet/GKE/cashback_program')
              } 
              disabled={!isChecked && !isActive && !(toNoFeeProgram || toCashbackProgram)}

              className={`whitespace-nowrap ${!(toNoFeeProgram || toCashbackProgram) ? 'cursor-auto hover:!shadow-none active:!shadow-none active:!bg-none' : ''}`}
            >
              <div className='flex flex-row'>
                <div className='flex items-center mr-2 ml-2'>
                  <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.920044 0.347656L5.91641 5.34402L0.920044 10.3404" stroke="#3A5E66"/>
                  </svg>
                </div>
                {(toNoFeeProgram || toCashbackProgram) && 'Go to the program'}
              </div>
            </Button>
          }
        </div>
    </div>
  )
})

export default CashbackCardMobile