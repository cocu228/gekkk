import { ActiveBonusProgram } from '@/shared/api/bank/deals';
import useModal from '@/shared/model/hooks/useModal';
import Button from '@/shared/ui/button/Button';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Modal from '@/shared/ui/modal/Modal';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SmsCodeModal from './CodeModal';
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
  const { isModalOpen: isSmsModalOpen, showModal: showSmsModal, handleCancel: handleSmsCancel } = useModal();

  const [isChecked, setChecked] = useState(false);


  return (
    <div className='flex mb-5 justify-center'>
      <div 
        // className={`${className} ${styles.CashbackCardMobile}`}
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
                  className='bg-white h-[30px] w-[30px]'
                  onChange={() => setChecked(!isChecked)}
                >
                  <span className={styles.CashbackModalTerms}>
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
                disabled={!isChecked}
                onClick={cashbackId === ActiveBonusProgram.CASHBACK_GKE
                  ? () => navigate('/wallet/GKE/Cashback Program')
                  : () => showSmsModal()
                }
                gray={isActive}
              >
                {cashbackId === ActiveBonusProgram.CASHBACK_GKE
                  ? 'Go to the program'
                  : !isActive
                    ? 'Get it now'
                    : 'Deactivate'
                }
              </Button>
            </div>
          </div>
      </Modal>
      {isSmsModalOpen &&
        <SmsCodeModal
          cashbackId={cashbackId}
          isModalOpen={isSmsModalOpen}
          handleCancel={handleSmsCancel}
          action={!isActive ? 'start' : 'stop'}
        />
      }
    </div>
  )
})

export default CashbackCardMobile