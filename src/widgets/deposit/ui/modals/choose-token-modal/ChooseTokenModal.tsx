import Modal from '@/shared/ui/modal/Modal';
import { ModalProps, Input } from 'antd';
import styles from './styles.module.scss';

const ChooseTokenModal = ({ open, onCancel, ...props }: ModalProps) => {
  return (
    <Modal open={open} onCancel={onCancel} className={styles.ChooseTokenModal} {...props}>
      <p className="font-bold text-lg mb-5 px-10">Select an investment token</p>

      <div className='wrapper px-10'>
        <Input type="text" placeholder="Search name" className="mb-6" />
      </div>

      <div>
        <div className="flex justify-between mb-2 px-10">
          <p className="text-gray">Name</p>
          <p className="text-gray">Price</p>
        </div>

        <div className={styles.TokensList}>
          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BtcIcon.svg" alt="btc"/>
              <p className='font-medium'>Bitcoin (BTC)</p>
            </div>

            <p className='font-medium'>20 856,44 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/EthIcon.svg" alt="eth"/>
              <p className='font-medium'>Ethereum (ETH)</p>
            </div>

            <p className='font-medium'>1 426,75 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>

          <div className="flex justify-between items-center px-10 py-4 even:bg-gray-light">
            <div className="flex gap-3 items-center">
              <img width={30} height={30} src="/img/tokens/BnbIcon.svg" alt="bnb"/>
              <p className='font-medium'>BNB (BNB)</p>
            </div>

            <p className='font-medium'>319.94 €</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChooseTokenModal;
