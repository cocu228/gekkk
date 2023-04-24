import {useContext, useState} from 'react';
import SecondaryTabGroup from '@/shared/ui/tabs-group/secondary';
import WithdrawForm from './WithdrawForm'
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";

const fiatTabs: Record<string, string> = {
    'gek_card': 'Payment Card',
    'crypto': 'Blockchain wallet',
}

const cryptoTabs: Record<string, string> = {
    'crypto': 'Blockchain wallet',
}


const Withdraw = () => {
    const {loading} = useContext(CtxWalletNetworks)

    return loading ? <Loader/> : (
        <div className='h-full'>
            <ChoseNetwork/>
            <WithdrawForm/>
        </div>
    );
};

export default Withdraw;
