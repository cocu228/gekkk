import {memo, useContext, useState} from 'react';
import TopUpQR from "../../top-up-withdraw-forms/ui/top-up-qr-form/TopUpQR";
import styles from "@/shared/ui/tabs-group/secondary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import GekkardAccountForm from "../../top-up-withdraw-forms/ui/gekkard-account-form/GekkardAccountForm";
// import BlockchainWallet from "@/widgets/wallet/EURG/BlockchainWallet";
import {CtxWalletNetworks} from "../../model/context";
import NoUsagesTopUpCode from "./(no-usages)TopUpCode";
import ChoseNetwork from "../../top-up-withdraw-forms/ui/ChoseNetwork";

type TBtnTabs = "gekkard-account" | "blockchain-wallet" | "top-up-code"


const TopUpEURG = memo(() => {

    // const {loading} = useContext(CtxWalletNetworks)
    const [btnTabs, setBtnTabs] = useState<TBtnTabs>("gekkard-account")


    return (<div className="wrapper">
        <div className="row flex mb-7">
            <div className="col">
                <button onClick={() => setBtnTabs("gekkard-account")}
                        className={`${styles.Tab} ${isActiveClass(btnTabs === "gekkard-account")} whitespace-nowrap`}>
                    Gekkard account
                </button>
            </div>
            <div className="col">
                <button onClick={() => setBtnTabs("blockchain-wallet")}
                        className={`${styles.Tab} ${isActiveClass(btnTabs === "blockchain-wallet")} whitespace-nowrap`}>
                    Blockchain wallet
                </button>
            </div>
            <div className="col">
                <button onClick={() => setBtnTabs("top-up-code")}
                        className={`${styles.Tab} ${isActiveClass(btnTabs === "top-up-code")} whitespace-nowrap`}>
                    Top Up Code
                </button>
            </div>
        </div>

        {btnTabs === "gekkard-account" && <GekkardAccountForm/>}
        {btnTabs === "blockchain-wallet" && <>
            <ChoseNetwork/>
            <TopUpQR/>
        </>}
        {btnTabs === "top-up-code" && <NoUsagesTopUpCode/>}

    </div>)

})

export default TopUpEURG;
