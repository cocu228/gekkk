import { ActiveBonusProgram } from '@/shared/api/bank/deals';
import useModal from '@/shared/model/hooks/useModal';
import Button from '@/shared/ui/button/Button';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Modal from '@/shared/ui/modal/Modal';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import SmsCodeModal from './SmsCodeModal';
import styles from './style.module.scss';

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

  const isCashbackCardGKE = cashbackId === ActiveBonusProgram.CASHBACK_GKE;



  return (
    <div className='flex mb-5 justify-center'>
      <div 
        className={` ${styles.CashbackCardMobile} ${className} ${isActive && styles.CashbackCardMobileActive}`}
        onClick={showModal}
      >
        <div className='flex'>
          <div className={styles.CashbackCardMobileName}>
            {name}
          </div>

          <img
            className={styles.CashbackCardMobileImage}
            src={iconPath}
          />
        </div>
        <div className={styles.CashbackCardMobileAccrualPeriod}>
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
      </div>
      <Modal 
        onCancel={handleCancel} 
        open={isModalOpen} 
        className={modalColor}
        padding={false}
      >
          <div className='flex items-end justify-between mt-6 p-3'>
            <div className='mb-12'>
              <div className={styles.CashbackCardMobileName}>
                {name}
              </div>
              <div className={styles.CashbackCardMobileAccrualPeriod}>
                {accrualPeriod}
              </div>
            </div>
            <img
              className={styles.CashbackCardMobileModalImage}
              src={iconPath}  
            />
          </div>
          <div className='flex flex-col justify-between bg-white -mx-4 -mb-4 h-[60vh]'>
            <div className={styles.CashbackModalDescription}>
              <div className={styles.CashbackModalDescriptionTitle}>
                Conditions
              </div>
              <ul className={`list-disc ${styles.CashbackModalDescriptionList}`}>
              {conditions.map((condition,i) => (
                  <li key={i}>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
           
            <div className='mx-[30px]'>
            {!isActive
              ? (
                <Checkbox
                  className={`bg-white h-[30px] w-[30px] ${isCashbackCardGKE ? 'hidden'  : ''}`}
                  onChange={() => setChecked(!isChecked)}
                  disabled={isCashbackCardGKE}
                >
                  <span className={`${styles.CashbackModalTerms} ${(isCashbackCardGKE) ? 'pl-0 text-center text-gray-500 tracking-wider text-xs' : ''}`}>
                    Bonus payments are a part of a loyalty program, provided by
                    FINTECH ASSETS OÜ. Terms and Conditions can be found here
                  </span>
                </Checkbox>
              )
              : (
                <div className="flex flex-col items-center">
                  <img
                    className="w-9 h-9 mb-3"
                    src='/img/cashback/active-cashback.svg'
                  />
                  <p className='text-lg mb-4 font-medium'>
                    This bonus program is on
                  </p>
                  <p className='text-gray-500 tracking-wider text-xs text-center'>
                    Bonus payments are a part of a loyalty program, provided by FINTECH ASSETS OÜ. I Agree with Terms and Conditions provided here
                    </p>
                </div>
              )
            }
              
              <Button 
                className='my-10 w-full uppercase'
                disabled={!isChecked && !isActive && !isCashbackCardGKE}
                onClick={isCashbackCardGKE
                  ? () => navigate('/wallet/GKE/cashback_program')
                  // : () => showSmsModal()
                  : () => {}

                }
                // gray={isActive}
              >
                {isCashbackCardGKE
                  ? 'Go to the program'
                  : !isActive
                    ? 'Get it now'
                    // : 'Deactivate'
                    : 'Activated'

                }
              </Button>
            </div>
          </div>
      </Modal>
      {/* {isSmsModalOpen &&
        <SmsCodeModal
          cashbackId={cashbackId}
          isModalOpen={isSmsModalOpen}
          handleCancel={handleSmsCancel}
          action={!isActive ? 'start' : 'stop'}
        />
      } */}
    </div>
  )
})

export default CashbackCardMobile