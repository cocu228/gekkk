import {useContext, memo, useState} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawFormCrypto from './forms/crypto/WithdrawFormCrypto';
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import {
    CtxWalletNetworks,
    CtxWalletData
} from '@/widgets/wallet/transfer/model/context';
import {getNetworkForChose} from "@/widgets/wallet/transfer/model/helpers";
import WithdrawFormSepa from "@/widgets/wallet/transfer/withdraw/ui/forms/sepa/WithdrawFormSepa";
import WithdrawFormSwift from "@/widgets/wallet/transfer/withdraw/ui/forms/WithdrawFormSwift";
import WithdrawFormCardToCard
    from "@/widgets/wallet/transfer/withdraw/ui/forms/card-to-card/WithdrawFormCardToCard";
import WithdrawFormBroker from "@/widgets/wallet/transfer/withdraw/ui/forms/broker/WithdrawFormBroker";
import {getFinalFee, getWithdrawEUR} from "@/widgets/wallet/transfer/withdraw/model/helper";
import Decimal from "decimal.js";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {isNull} from "@/shared/lib/helpers";
import WithdrawFormPapaya from "@/widgets/wallet/transfer/withdraw/ui/forms/papaya/WithdrawFormPapaya";
import WithdrawFormPhoneNumber from "@/widgets/wallet/transfer/withdraw/ui/forms/phone-number/WithdrawFormPhoneNumber";

const Withdraw = memo(() => {

    const currency = useContext(CtxWalletData)
    const {ratesEUR} = useContext(CtxCurrencies)

    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const formType = getNetworkForChose(networksDefault, networkIdSelect)?.network_type


    const {
        withdraw_fee = 0,
        percent_fee = 0,
        is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}

    const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);

    const withdrawEUR = !isNull(ratesEUR) && getWithdrawEUR(finalFeeEntity.value.number, ratesEUR[currency.$const]);
    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>
                {(formType >= 10 && formType < 23) || (formType >= 200 && formType <= 223) ?
                    <WithdrawFormCrypto/> :
                    formType === 150 ?
                        <WithdrawFormPapaya/> :
                        151 === formType ?
                            <WithdrawFormSepa/> :
                            152 === formType ?
                                <WithdrawFormSwift/> :
                            153 === formType ?
                                <WithdrawFormCardToCard/> :
                                154 === formType ?
                                    <WithdrawFormBroker/> :
                                    <div> Sorry, there are no actions available for the selected network. </div>}

                {(finalFeeEntity.type.percent || finalFeeEntity.type.number) && <div className="row mt-4">
                    <div className="col">
                        <div className='text-center'>
                            Fee is {finalFeeEntity.type.number ?
                            <>
                                <span><b>{new Decimal(finalFeeEntity.value.number).toString()} </b>{currency.$const}</span>
                                {withdrawEUR && <span className="ml-2">( ~ <b>{withdrawEUR}</b> EUR)</span>}
                            </> :
                            <b>{new Decimal(finalFeeEntity.value.percent).toString()} %</b>
                        } per transaction
                        </div>
                    </div>
                </div>}

                {is_operable === false && <div className="row mt-4">
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
});

export default Withdraw;
