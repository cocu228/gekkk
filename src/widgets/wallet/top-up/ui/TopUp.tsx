import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import {IResTokenNetwork} from "@/shared/api";
import FiatFormTopUp from "@/widgets/wallet/fiat-currency/FiatFormTopUp";
import {testGekkardAccount} from "@/widgets/wallet/model/helper";



const TopUp = memo(() => {

    const currency = useContext(CtxWalletData)

    if (currency.$const === "EUR") return <FiatFormTopUp/>

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const isGekkardAccount = testGekkardAccount(networksDefault, networkIdSelect)

    return (<div className="wrapper">
        {loading ? <Loader/> : <>

            <ChoseNetwork/>
            {isGekkardAccount ?
                <GekkardAccount/>
                : <TopUpQR/>}
        </>}
    </div>);
});

export default TopUp;
