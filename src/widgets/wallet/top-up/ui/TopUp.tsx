import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import FiatFormTopUp from "@/widgets/wallet/fiat-currency/FiatFormTopUp";
import {formTypeSelect, getNetworkForChose, testGekkardAccount} from "@/widgets/wallet/model/helpers";



const TopUp = memo(() => {

    // const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    // const isGekkardAccount = testGekkardAccount(networksDefault, networkIdSelect)
    const formType = formTypeSelect(getNetworkForChose(networksDefault, networkIdSelect)?.network_type)

    const getDisplayForm = (type: string) => {
        switch(type) {
            case 'internal':
                return <GekkardAccount/>;
            case 'crypto':
                return <TopUpQR/>;
            case 'requisites':
                return <FiatFormTopUp/>;
            default:
                return null;
        }
    } 

    return (<div className="wrapper">

        {loading ? <Loader/> : <>
            <ChoseNetwork/>

            {getDisplayForm(formType)}
        </>}
    </div>);
});

export default TopUp;
