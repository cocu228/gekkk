import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import TopUpEURG from "@/widgets/wallet/top-up/ui/EURG";
import NetworkProvider from "@/widgets/wallet/model/NetworkProvider";


const TopUp = () => {

    const {loading = true} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency),
        isEURG = currency.const === "EURG"

    console.log(loading)

    return (<div className="wrapper">
        {loading ? <Loader/> : isEURG ? <TopUpEURG/> :
            <>
                <ChoseNetwork/>
                <TopUpQR/>
            </>}
    </div>)

};

export default TopUp;
