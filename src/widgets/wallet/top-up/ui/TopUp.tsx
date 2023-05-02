import {useContext, useEffect, useState} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import TopUpEURG from "@/widgets/wallet/top-up/ui/EURG";


const TopUp = () => {
    const {loading} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency),
        isEURG = currency.const === "EURG"

    return (<div className="wrapper">
        {loading ? <Loader/> :
            isEURG ? <TopUpEURG/> : <>
                <ChoseNetwork/>
                <TopUpQR/>
            </>}
    </div>)

};

export default TopUp;
