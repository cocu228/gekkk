import {useState} from 'react';
import SecondaryTabGroup from '@/shared/ui/tabs-group/secondary';
import CryptoTopUp from './crypto/CryptoTopUp';
import {IResListAddresses} from '@/shared/api';
import {storeListAddresses} from "@/shared/store/crypto-assets";
import Loader from "@/shared/ui/loader";

const fiatTabs: Record<string, string> = {
    'gek_card': 'Payment Card',
    'crypto': 'Blockchain wallet',
}

const cryptoTabs: Record<string, string> = {
    'crypto': 'Blockchain wallet',
}

interface TopUpParams {
    // flags: number,
    currency: string,
    // listAddresses: IResListAddresses[];
}

const TopUp = ({currency}: TopUpParams) => {

    const listAddresses = storeListAddresses(state => state.listAddresses)
    const getListAddresses = storeListAddresses(state => state.getListAddresses)

    return (<div className="wrapper relative">
        {listAddresses === null ? <Loader/> : <CryptoTopUp
            currency={currency}
            listAddresses={listAddresses}
        />
        }</div>)

};

export default TopUp;
