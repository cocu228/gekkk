import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletCurrency, CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";


const TopUp = memo(() => {

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const currency = useContext(CtxWalletCurrency),
        // isEURG = currency.const === "EURG",
        formBank = Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3

    return (<div className="wrapper">
        {loading ? <Loader/> :
            <>
                <ChoseNetwork/>
                <>{formBank ? <GekkardAccount/> :
                    <TopUpQR/>
                }</>
            </>}
    </div>)

})

export default TopUp;
