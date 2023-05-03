import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import TopUpEURG from "@/widgets/wallet/top-up/ui/EURG";
import NetworkProvider from "@/widgets/wallet/model/NetworkProvider";


const TopUp = memo(() => {

    const {loading = true} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency),
        isEURG = currency.const === "EURG"

    return (<div className="wrapper">
        {isEURG ? <TopUpEURG/> :
            loading ? <Loader/> :
                <>
                    <ChoseNetwork/>
                    <TopUpQR/>
                </>}
    </div>)

})

export default TopUp;
