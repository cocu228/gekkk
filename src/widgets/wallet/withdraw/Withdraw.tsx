import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from './WithdrawForm';
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import GekkardAccount from "@/widgets/wallet/top-up/ui/EURG/GekkardAccount";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";

const Withdraw = () => {

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const {currency} = useContext(CtxWalletData),
        // isEURG = currency === "EURG",
        formBank = Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3
    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>
                {formBank ? <GekkardAccount/> :
                    <WithdrawForm/>}
            </>}
        </div>
    );
};

export default Withdraw;
