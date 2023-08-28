import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import TopUpQR from "@/widgets/wallet/top-up-withdraw-forms/ui/top-up-qr-form/TopUpQR";
import GekkardAccountForm from "@/widgets/wallet/top-up-withdraw-forms/ui/gekkard-account-form/GekkardAccountForm";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import FiatFormTopUp from "@/widgets/wallet/top-up-withdraw-forms/ui/top-up-fiat-form/FiatFormTopUp";
import {
    formTypeSelect,
    getNetworkForChose,
    testGekkardAccount,
    TYPES_WALLET_FORM_UI
} from "@/widgets/wallet/model/helpers";
import WithdrawForm from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-token-form/WithdrawForm";
import FiatSwiftFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-swift-form/FiatSwiftFormWithdraw";
import FiatFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-fiat-form/FiatFormWithdraw";



const TopUp = memo(() => {

    // const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    // const isGekkardAccount = testGekkardAccount(networksDefault, networkIdSelect)
    const formType = getNetworkForChose(networksDefault, networkIdSelect)?.network_type

    return (<div className="wrapper">

        {loading ? <Loader/> : <>
            <ChoseNetwork/>

            {TYPES_WALLET_FORM_UI.topUp.gekkardAccount.some(it => it === formType) ?
                <GekkardAccountForm/>
                : TYPES_WALLET_FORM_UI.topUp.qr.some(it => it === formType) ?
                    <TopUpQR/> :
                    TYPES_WALLET_FORM_UI.topUp.swift.some(it => it === formType) ?
                        <FiatSwiftFormWithdraw/> :
                        TYPES_WALLET_FORM_UI.topUp.fiat.some(it => it === formType) ?
                            <FiatFormTopUp/> :
                            <div> Sorry, there are no actions available for the selected network. </div>}
        </>}
    </div>);
});

export default TopUp;
