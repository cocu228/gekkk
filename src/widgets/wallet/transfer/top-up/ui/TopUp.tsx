import {memo, useContext} from 'react';
import Loader from "@/shared/ui/loader";
import TopUpFormQR from "@/widgets/wallet/transfer/top-up/ui/forms/TopUpFormQR";
// import GekkardAccountForm from "@/widgets/wallet/top-up-withdraw-forms/ui/gekkard-account-form/GekkardAccountForm";
import ChoseNetwork from "@/widgets/wallet/transfer/ChoseNetwork";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import TopUpFormSepa from "@/widgets/wallet/transfer/top-up/ui/forms/TopUpFormSepa";
import {
    // formTypeSelect,
    getNetworkForChose,
    // testGekkardAccount,
    // TYPES_WALLET_FORM_UI
} from "@/widgets/wallet/transfer/model/helpers";
import {useNavigate} from "react-router-dom";
// import WithdrawForm from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-token-form/WithdrawForm";
// import FiatSwiftFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-swift-form/FiatSwiftFormWithdraw";
// import FiatFormWithdraw from "@/widgets/wallet/top-up-withdraw-forms/ui/withdraw-fiat-form/FiatFormWithdraw";



const TopUp = memo(() => {

    // const currency = useContext(CtxWalletData)
    const {loading = true, networkIdSelect, networksDefault} = useContext(CtxWalletNetworks)
    const navigate = useNavigate();
    // const isGekkardAccount = testGekkardAccount(networksDefault, networkIdSelect)
    const formType = getNetworkForChose(networksDefault, networkIdSelect)?.network_type
    const {
        is_operable = null
    } = getNetworkForChose(networksDefault, networkIdSelect) ?? {}


    console.log(getNetworkForChose(networksDefault, networkIdSelect))

    return (<div className="wrapper">

        {loading ? <Loader/> : <>

            <ChoseNetwork/>

            {(formType > 10 && formType < 23) || (formType > 200 && formType < 223) ?
                <TopUpFormQR/> : formType === 150 ?
                    <div>
                        <b>
                            ou can top up your EURG wallet via fiat on the EUR withdrawal form <a
                            className="text-blue-400"
                            onClick={() => navigate("/wallet/EUR/Withdraw")}
                            href="javascript:void(0)">link</a>
                        </b>
                    </div> :
                    151 === formType ?
                        <TopUpFormSepa/> :
                        154 === formType ?
                            <div>
                                <b>
                                    You can top up your EUR wallet via cryptocurrency on the EURG withdrawal form <a
                                    className="text-blue-400"
                                    onClick={() => navigate("/wallet/EURG/Withdraw")}
                                    href="javascript:void(0)">link</a>
                                </b>
                            </div> :
                            <div> Sorry, there are no actions available for the selected network. </div>}

            {is_operable === false && <div className="row mb-4 mt-4">
                <div className="col">
                    <div className="info-box-danger">
                        <p>Attention: transactions on this network may be delayed. We recommend that you use a different
                            network for this transaction.</p>
                    </div>
                </div>
            </div>}

        </>}
    </div>);
});

export default TopUp;
