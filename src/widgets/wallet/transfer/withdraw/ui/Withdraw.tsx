import {useContext} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawFormCrypto from './forms/crypto/WithdrawFormCrypto';
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from '@/widgets/wallet/transfer/model/context';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import WithdrawFormSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawFormSepa";
import WithdrawFormSwift from "@/widgets/wallet/transfer/withdraw/ui/forms/WithdrawFormSwift";
import WithdrawFormCardToCard
    from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawFormCardToCard";
import WithdrawFormBroker from "@/widgets/wallet/transfer/withdraw/ui/forms/broker/WithdrawFormBroker";
import {getFinalFee} from "@/widgets/wallet/transfer/withdraw/model/helper";
import Decimal from "decimal.js";

const Withdraw = () => {

    const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const formType = getNetworkForChose(networksDefault, networkIdSelect)?.network_type

    const {
        withdraw_fee = null,
        percent_fee = null,
        is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);

    console.log(finalFeeEntity)
    console.log(finalFeeEntity)
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
                                    <WithdrawFormBroker/> :
                                    <div> Sorry, there are no actions available for the selected network. </div>}

                <div className="row mb-4 mt-4">
                    <div className="col">
                        {finalFeeEntity.type.number && <div className='text-center'>
                            Fee is <b>{new Decimal(finalFeeEntity.value.number).toString()} {currency.$const}</b> per transaction
                        </div>}
                        {finalFeeEntity.type.percent && <div className='text-center'>
                            Fee is <b>{finalFeeEntity.value.percent}%</b> per transaction
                        </div>}
                    </div>
                </div>

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
