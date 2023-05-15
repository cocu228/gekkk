import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/top-up/ui/EURG/GekkardAccount";


const TopUp = memo(() => {

    const {loading = true, networkIdSelect} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency),
        isEURG = currency.const === "EURG"

    return (<div className="wrapper">
        {loading ? <Loader/> :
            <>
                <ChoseNetwork/>
                <>{networkIdSelect === 122 && isEURG ? <GekkardAccount/> :
                    <TopUpQR/>
                }</>
            </>}
    </div>)

})

export default TopUp;
