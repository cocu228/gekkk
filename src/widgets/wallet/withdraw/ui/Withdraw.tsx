import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawForm from '../../top-up-withdraw-forms/ui/withdraw-token-form/WithdrawForm';
import GekkardAccountForm from "@/widgets/wallet/top-up-withdraw-forms/ui/gekkard-account-form/GekkardAccountForm";
import ChoseNetwork from "@/widgets/wallet/top-up-withdraw-forms/ui/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from '../../model/context';
// import {CtxCurrencies} from '@/processes/CurrenciesContext';
import {TYPES_WALLET_FORM_UI, getNetworkForChose} from "@/widgets/wallet/model/helpers";
import FiatFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-fiat-form/FiatFormWithdraw";
import FiatSwiftFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-swift-form/FiatSwiftFormWithdraw";
import {isNull} from "@/shared/lib/helpers";
import CardToCardFormWithdraw
    from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-card-to-card-form/CardToCardFormWithdraw";


// < 10  > 23
// 150 sepo
// 154 gekkard
// < 200 > 222
const Withdraw = () => {

    const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const formType = getNetworkForChose(networksDefault, networkIdSelect)?.network_type

    const {
        withdraw_fee = null,
        is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>

                <ChoseNetwork withdraw/>

                {(formType > 10 && formType < 23) || (formType > 200 && formType < 223) ?
                    <WithdrawForm/> :
                    formType === 150 ?
                        <div>
                            This is PapayaIBAN Withdraw!!
                            <GekkardAccountForm/>
                        </div> :
                        152 === formType ?
                            <FiatSwiftFormWithdraw/> :
                            153 === formType ?
                                <CardToCardFormWithdraw/> :
                                154 === formType ?
                                    <div>
                                        This is CryptoWalletForm Withdraw
                                        <GekkardAccountForm/>
                                    </div> :
                                    <div> Sorry, there are no actions available for the selected network. </div>}

                {!isNull(withdraw_fee) && <div className="row mb-4 mt-4">
                    <div className="col">
                        <div className='text-center'>
                            Fee is <b>{withdraw_fee} {currency.$const}</b> per transaction
                        </div>
                    </div>
                </div>}

                {is_operable === false && <div className="row">
                    <div className="col">
                        <div className="info-box-danger">
                            <p>Attention: transactions on this network may be delayed. We recommend that you use a
                                different
                                network for this transaction.</p>
                        </div>
                    </div>
                </div>}

            </>}
        </div>
    );
};

export default Withdraw;
