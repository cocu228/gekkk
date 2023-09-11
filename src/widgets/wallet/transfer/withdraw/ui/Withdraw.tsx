import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawFormCrypto from './forms/crypto/WithdrawFormCrypto';
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from '@/widgets/wallet/transfer/model/context';
// import {CtxCurrencies} from '@/processes/CurrenciesContext';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import WithdrawFormSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawFormSepa";
import WithdrawFormSwift from "@/widgets/wallet/transfer/withdraw/ui/forms/WithdrawFormSwift";
import {isNull} from "@/shared/lib/helpers";
import WithdrawFormCardToCard
    from "@/widgets/wallet/transfer/withdraw/ui/forms/WithdrawFormCardToCard";
import WithdrawFormBroker from "@/widgets/wallet/transfer/withdraw/ui/forms/WithdrawFormBroker";


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
                    <WithdrawFormCrypto/> :
                    formType === 150 ?
                        <div>
                            <b>
                            This is PapayaIBAN Withdraw!!
                            </b>
                            <WithdrawFormBroker/>
                        </div> :
                        151 === formType ?
                            <WithdrawFormSepa/> :
                            152 === formType ?
                                <WithdrawFormSwift/> :
                            153 === formType ?
                                <WithdrawFormCardToCard/> :
                                154 === formType ?
                                    <div>
                                        <b>
                                        This is CryptoWalletForm Withdraw
                                        </b>
                                        <WithdrawFormBroker/>
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
