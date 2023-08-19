import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from './WithdrawForm';
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import { CtxWalletData, CtxWalletNetworks } from '../../model/context';
import {testGekkardAccount} from "@/widgets/wallet/model/helper";
import EURFormWithdraw from "@/widgets/wallet/EUR/EURFormWithdraw";

const Withdraw = () => {
    const currency = useContext(CtxWalletData)

    if (currency.$const === "EUR") return <EURFormWithdraw/>

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)

    const isGekkardAccount = testGekkardAccount(networksDefault, networkIdSelect)

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>
                {isGekkardAccount ? <GekkardAccount/> :
                    <WithdrawForm/>}
            </>}
        </div>
    );
};

export default Withdraw;
