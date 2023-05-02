import {useContext} from 'react';
import NetworkProvider from "@/widgets/wallet/model/NetworkProvider";
import WithdrawForm from './WithdrawForm'
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";

// const fiatTabs: Record<string, string> = {
//     'gek_card': 'Payment Card',
//     'crypto': 'Blockchain wallet',
// }
//
// const cryptoTabs: Record<string, string> = {
//     'crypto': 'Blockchain wallet',
// }


const Withdraw = () => {

    const {loading = true} = useContext(CtxWalletNetworks)

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <><ChoseNetwork/>
                <WithdrawForm/></>}
        </div>
    );
};

export default Withdraw;
