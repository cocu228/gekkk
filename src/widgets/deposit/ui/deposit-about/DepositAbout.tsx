import {useContext} from 'react';
import AboutFixed from '../deposit-fixed/about-fixed/AboutFixed';
import AboutStructured from '../deposit-structured/about-structured/AboutStructured';
import {CtxNewDeposit} from '../../model/context';
import { DepositType } from '@/shared/config/deposits/types';

const DepositAbout = () => {
  const {type} = useContext(CtxNewDeposit);

  return (
    <div className="wrapper col-span-2 bg-white px-7 py-20 xl:hidden xxl:p-5">
      {type === DepositType.STRUCTED ? <AboutStructured/> : <AboutFixed/>}
    </div>
  );
};

export default DepositAbout;
