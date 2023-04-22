import {useContext, useEffect, useState} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet-stage/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks} from "@/widgets/wallet-stage/top-up/model/context";
import TopUpQR from "@/widgets/wallet-stage/top-up/ui/TopUpQR";

// const fiatTabs: Record<string, string> = {
//     'gek_card': 'Payment Card',
//     'crypto': 'Blockchain wallet',
// }
//
// const cryptoTabs: Record<string, string> = {
//     'crypto': 'Blockchain wallet',
// }


const TopUp = () => {

    const [hash, setHash] = useState(null)

    const {loading} = useContext(CtxWalletNetworks)


    return (<div className="wrapper">
        {loading ? <Loader/> : <>
            <ChoseNetwork setHash={setHash} hash={hash}/>
            <TopUpQR hash={hash}/>
        </>}
    </div>)

};

export default TopUp;
