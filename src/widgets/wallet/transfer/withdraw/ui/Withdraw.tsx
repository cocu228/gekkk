import {useContext, memo, useEffect, useState} from 'react';
import Loader from "@/shared/ui/loader";
import WithdrawFormCrypto from './forms/crypto/WithdrawFormCrypto';
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from '@/widgets/wallet/transfer/model/context';
import {getChosenNetwork, isCryptoNetwork} from "@/widgets/wallet/transfer/model/helpers";
import WithdrawFormSepa from "./forms/sepa/WithdrawFormSepa";
import WithdrawFormSwift from "./forms/WithdrawFormSwift";
import WithdrawFormCardToCard from "./forms/card-to-card/WithdrawFormCardToCard";
import WithdrawFormBroker from "./forms/broker/WithdrawFormBroker";
import {getFinalFee, getWithdrawEUR} from "@/widgets/wallet/transfer/withdraw/model/helper";
import Decimal from "decimal.js";
import WithdrawFormPapaya from "./forms/papaya/WithdrawFormPapaya";
import WithdrawFormPhoneNumber from "./forms/phone-number/WithdrawFormPhoneNumber";
import UniversalTransferForm from "@/widgets/wallet/transfer/withdraw/ui/forms/universal-transfer/UniversalTransferForm";
import CreateTransferCode from "./forms/create-transfer-code";
import {getInitialProps, useTranslation} from 'react-i18next';
import {apiGetRates} from '@/shared/(orval)api';

const Withdraw = memo(() => {
    const {t} = useTranslation()
    const currency = useContext(CtxWalletData);
    const {initialLanguage} = getInitialProps()
    const [withdrawEUR, setWithdrawEUR] = useState<string>(null);
    const {
        tokenNetworks,
        loading = true,
        networkTypeSelect,
    } = useContext(CtxWalletNetworks);
    
    const {
        percent_fee = 0,
        withdraw_fee = 0,
        is_operable = null,
        network_type: networkType = null
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {};
    
    const finalFeeEntity = getFinalFee(withdraw_fee, percent_fee);

    useEffect(() => {
        (async () => {
            const {data} = await apiGetRates({
                to: 'EUR'
            });

            const result = getWithdrawEUR(
                finalFeeEntity.value.number,
                data.result[currency.$const]
            );

            setWithdrawEUR(result);
        })();
    }, []);

    const getDisplayForm = (networkType: number): JSX.Element => {
        if (isCryptoNetwork(networkType)) {
            return <WithdrawFormCrypto/>;
        }
        
        switch (networkType) {
            case 150:
                return <WithdrawFormPapaya/>;
            case 151:
                return <WithdrawFormSepa/>;
            case 152:
                return <WithdrawFormSwift/>;
            case 153:
                return <WithdrawFormCardToCard/>;
            case 154:
                return <WithdrawFormBroker/>;
            case 155:
                return <WithdrawFormPhoneNumber/>;
            case 230:
                return <UniversalTransferForm/>;
            case 231:
                return <CreateTransferCode/>;
            default:
                return <div>
                    {t("no_actions_for_network")}
                </div>;
        }
    }
    const [displayedForm, setDisplayedForm] = useState(getDisplayForm(networkTypeSelect))

    useEffect(()=>{
        setDisplayedForm(getDisplayForm(networkType))
    },[initialLanguage, networkTypeSelect])
    
    return (
        <div className='h-full'>
            {loading ? <Loader/> : <>
                <ChoseNetwork withdraw/>
                {displayedForm}
                
                {(finalFeeEntity.type.percent || finalFeeEntity.type.number) && <div className="row mt-4">
                    <div className="col">
                        <div className='text-center'>
                            {t("fee_is_perc")} {finalFeeEntity.type.number ?
                            <>
                                <span><b>{new Decimal(finalFeeEntity.value.number).toString()} </b>{currency.$const}</span>
                                {withdrawEUR && <span className="ml-2">( ~ <b>{withdrawEUR}</b> EUR)</span>}
                            </> :
                            <b>{new Decimal(finalFeeEntity.value.percent).toString()} %</b>
                        } {t("per_transaction")}
                        </div>
                    </div>
                </div>}

                {is_operable === false && <div className="row mt-4">
                    <div className="col">
                        <div className="info-box-danger">
                            <p>{t("attention")}</p>
                        </div>
                    </div>
                </div>}

            </>}
        </div>
    );
});

export default Withdraw;
