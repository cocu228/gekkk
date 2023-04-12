import React from 'react';
import PercentBtn from '@/shared/ui/percent-btn/PercentBtn';
import DepositInput from '../deposit-input';
import InfoBlock from '../deposit-fixed/info-block';
import styles from './styles.module.scss';
import FixedVariant from '../deposit-fixed/fixed-variant/FixedVariant';
import StructuredVariant from '../deposit-structured/structured-variant/StructuredVariant';
import Radio from '@/shared/ui/radio';

const DepositChoose = ({ variant, setVariant }) => {
  return (
    <div
      className={`${styles.DepositChoose} wrapper col-span-3 bg-white rounded-l-md p-10 flex flex-col justify-start items-start xxl:py-3 xxl:px-4 xl:col-span-5`}
    >
      <div>
        <p className="text-base font-medium text-gray-400 mb-6 md:text-sm md:mb-4">
          Choose deposit types
        </p>

        <div className="wrapper grid grid-cols-2 gap-6 mb-8 w-full xxl:justify-between md:mb-4">
          <Radio
            title="Fixed rate"
            subtitle={
              <>
                <span className="font-bold">9,6%</span> per annum (
                <span className="font-bold">0,8%</span> per month)
              </>
            }
            value="fixed"
            checked={variant === 'fixed'}
            onChange={setVariant}
            name="deposit-fixed"
          />
          <Radio
            title="Structured"
            subtitle="Crypto investments with customizable risk/profit"
            value="structured"
            checked={variant === 'structured'}
            onChange={setVariant}
            name="deposit-structured"
          />
        </div>

        <div className="wrapper mb-8 hidden xl:block md:mb-5">
          <InfoBlock variant={variant} />
        </div>

        <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
          <div className="row flex justify-between mb-2 md:mb-1">
            <p className="text-gray-400 font-medium text-base md:text-sm sm:text-xs">
              Enter deposit amount
            </p>

            <div className="row flex gap-1">
              <PercentBtn>25%</PercentBtn>
              <PercentBtn>50%</PercentBtn>
              <PercentBtn>75%</PercentBtn>
              <PercentBtn>100%</PercentBtn>
            </div>
          </div>

          <DepositInput />
        </div>
      </div>

      {variant === 'structured' ? <StructuredVariant /> : <FixedVariant />}
    </div>
  );
};

export default DepositChoose;
