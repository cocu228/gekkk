import {useContext} from 'react';
import styles from './styles.module.scss';
import InlineProperty from '@/shared/ui/inline-property';
import {DepositType} from '@/shared/config/deposits/types';
import {CtxNewDeposit} from '@/widgets/deposit/model/context';
import TypeDescriptions from '@/shared/config/deposits/deposit-type';

const AboutFixed = () => {
  const {amount} = useContext(CtxNewDeposit);

  return (
    <>
      <div className="wrapper mb-20 w-full">
        {TypeDescriptions[DepositType.FIXED]}
      </div>

      {amount !== null && (
        <div className={`wrapper ${styles.InvestBlock}`}>
          <p className="text-lg font-bold mb-5">
            You invest {amount} EURG for 360 days
          </p>
          <div className='flex flex-col gap-3 md:gap-2'>
            <InlineProperty left="Risk level" right="Fixed rate deposit" />
            <InlineProperty left="Returns rate" right="0,8% per month" />
          </div>
        </div>
      )}
    </>
  );
};

export default AboutFixed;
