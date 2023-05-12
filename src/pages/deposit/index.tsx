import NewDepositProvider from '@/widgets/deposit/model/NewDepositProvider';
import Deposit from '@/widgets/deposit/ui/Deposit';

export default () => (
    <div className="wrapper flex-1 flex flex-col">
        <div className="wrapper -mx-4 px-4 mb-10 md:mb-6">
            <h2 className="text-3xl font-bold mb-4 md:text-2xl md:mb-2">New deposit</h2>
            <p className="text-sm">
                A modern alternative to a bank deposit.<br/>
                Invest in a cryptocurrency with full or partial protection of investments
            </p>
        </div>

        <NewDepositProvider>
            <Deposit/>
        </NewDepositProvider>
    </div>
)
