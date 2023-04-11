import InlineProperty from '@/shared/ui/inline-property';
import InfoBlock from '../info-block';
import styles from './styles.module.scss';

const AboutFixed = () => {
  return (
    <>
      <div className="wrapper mb-20 w-full">
        <InfoBlock variant='fixed' />
      </div>

      <div className={`wrapper ${styles.InvestBlock}`}>
        <p className="text-lg font-bold mb-5">
          You invest 1000.00 EURG for 360 days
        </p>
        <div className='flex flex-col gap-3 md:gap-2'>
          <InlineProperty left="Risk level" right="Fixed rate deposit" />
          <InlineProperty left="Returns rate" right="0,8% per month" />
        </div>
      </div>
    </>
  );
};

export default AboutFixed;
