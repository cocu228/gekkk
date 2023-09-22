import useModal from '@/shared/model/hooks/useModal';
import Button from '@/shared/ui/button/Button';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Modal from '@/shared/ui/modal/Modal';
import { useState } from 'react';
import styles from './style.module.scss';

const CashbackCardMobile = ({ subtitle, className, modalColor, description, iconPath, conditions }: {
  iconPath: string;
  subtitle: string;
  className: string;
  modalColor: string;
  description: string;
  conditions: Array<string>;
}) => {
  const { isModalOpen, showModal, handleCancel } = useModal();
  const [isChecked, setChecked] = useState(false);


  return (
    <div className='flex mb-5 justify-center'>
      <div 
        className={`
                ${className}
                ${styles.CashbackCardMobile}
            `}
        onClick={showModal}
      >
        <div className='flex'>
          <div className={styles.CashbackCardMobileTitle}>
            {description}
          </div>

          <img
            className={styles.CashbackCardMobileImage}
            src={iconPath}
          />
        </div>

        <div className={styles.CashbackCardMobileSubtitle}>
          {subtitle}
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
              <div className={styles.CashbackCardMobileTitle}>
                {description}
              </div>
              <div className={styles.CashbackCardMobileSubtitle}>
                {subtitle}
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
                {conditions.map(c => (
                  <li>{c}</li>
                ))}
              </ul>
            </div>
            <div className='mx-[30px]'>
              <Checkbox
                className='bg-white h-[30px] w-[30px]'
                onChange={() => setChecked(!isChecked)}
              >
                <span className={styles.CashbackModalTerms}>
                  Bonus payments are a part of a loyalty program, provided by <span className={styles.CashbackModalTermsLink}>FINTECH ASSETS OÜ.</span> I Agree with Terms and Conditions provided here
                </span>
              </Checkbox>
              <Button 
                className='my-10 w-full uppercase'
                disabled={!isChecked}
              >
                Get it now
              </Button>
            </div>
          </div>
      </Modal>
    </div>
  )
}

export default CashbackCardMobile