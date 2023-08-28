import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from '../../top-up-withdraw-forms/ui/withdraw-token-form/WithdrawForm';
import GekkardAccountForm from "@/widgets/wallet/top-up-withdraw-forms/ui/gekkard-account-form/GekkardAccountForm";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";
import {CtxWalletNetworks} from '../../model/context';
import {TYPES_WALLET_FORM_UI, getNetworkForChose} from "@/widgets/wallet/model/helpers";
import FiatFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-fiat-form/FiatFormWithdraw";
import FiatSwiftFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-swift-form/FiatSwiftFormWithdraw";

const Withdraw = () => {
    // const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const formType = getNetworkForChose(networksDefault, networkIdSelect)?.network_type

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>


                {TYPES_WALLET_FORM_UI.withdraw.gekkardAccount.some(it => it === formType) ?
                    <GekkardAccountForm withdraw/>
                    : TYPES_WALLET_FORM_UI.withdraw.tokenForm.some(it => it === formType) ?
                        <WithdrawForm/> :
                        TYPES_WALLET_FORM_UI.withdraw.swift[0] === formType ?
                            <FiatSwiftFormWithdraw/> :
                            TYPES_WALLET_FORM_UI.withdraw.fiat.some(it => it === formType) ?
                                <FiatFormWithdraw/> :
                                <div> Sorry, there are no actions available for the selected network. </div>}

            </>}
        </div>
    );
};

export default Withdraw;
