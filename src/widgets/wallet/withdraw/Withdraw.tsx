import {useContext} from 'react';
import WithdrawForm from './WithdrawForm'
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";


const Withdraw = () => {

    const {loading = true} = useContext(CtxWalletNetworks)

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <><ChoseNetwork withdraw/>
                <WithdrawForm/></>}
        </div>
    );
};

export default Withdraw;
