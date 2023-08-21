import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from './WithdrawForm';
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import { CtxWalletData, CtxWalletNetworks } from '../../model/context';
import {testGekkardAccount} from "@/widgets/wallet/model/helper";
import FiatFormWithdraw from "@/widgets/wallet/fiat-currency/FiatFormWithdraw";

const Withdraw = () => {
    const currency = useContext(CtxWalletData)

    if (currency.$const === "EUR") return <FiatFormWithdraw/>

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)

    const isGekkardAccount = testGekkardAccount(networksDefault, networkIdSelect)

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>
                {isGekkardAccount ? <GekkardAccount withdraw/> :
                    <WithdrawForm/>}
            </>}
        </div>
    );
};

export default Withdraw;
