import {useContext, useEffect, useState} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";

// const fiatTabs: Record<string, string> = {
//     'gek_card': 'Payment Card',
//     'crypto': 'Blockchain wallet',
// }
//
// const cryptoTabs: Record<string, string> = {
//     'crypto': 'Blockchain wallet',
// }


const TopUp = () => {

    const {loading} = useContext(CtxWalletNetworks)


    return (<div className="wrapper">
        {loading ? <Loader/> : <>
            <ChoseNetwork/>
            <TopUpQR/>
        </>}
    </div>)

};

export default TopUp;
