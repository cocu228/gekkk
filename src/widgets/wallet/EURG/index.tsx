import {memo, useContext, useState} from 'react';
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import styles from "@/shared/ui/tabs-group/secondary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import GekkardAccount from "@/widgets/wallet/EURG/GekkardAccount";
import BlockchainWallet from "@/widgets/wallet/EURG/BlockchainWallet";
import {CtxWalletNetworks} from "@/widgets/wallet/model/context";
import TopUpCode from "@/widgets/wallet/EURG/TopUpCode";
import ChoseNetwork from "@/widgets/wallet/top-up/ui/ChoseNetwork";

type TBtnTabs = "gekkard-account" | "blockchain-wallet" | "top-up-code"


const TopUpEURG = memo(() => {

    const {loading} = useContext(CtxWalletNetworks)
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

        {btnTabs === "gekkard-account" && <GekkardAccount/>}
        {btnTabs === "blockchain-wallet" && <>
            <ChoseNetwork/>
            <TopUpQR/>
        </>}
        {btnTabs === "top-up-code" && <TopUpCode/>}

    </div>)

})

export default TopUpEURG;
