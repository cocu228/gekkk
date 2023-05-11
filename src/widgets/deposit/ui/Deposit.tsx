import DepositChoose from '@/widgets/deposit/ui/deposit-choose/DepositChoose';
import DepositAbout from '@/widgets/deposit/ui/deposit-about/DepositAbout';
import NewDepositProvider from '../model/NewDepositProvider';

function Deposit() {
  return (
    <div className="wrapper grid grid-cols-5 h-full mb-8">
        <NewDepositProvider>
          <DepositChoose/>   
          <DepositAbout/>
        </NewDepositProvider>
      </div>
  );
}

export default Deposit;
