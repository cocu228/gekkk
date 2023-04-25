import {useState} from 'react';
import TopUpQR from "@/widgets/wallet/top-up/ui/TopUpQR";
import styles from "@/shared/ui/tabs-group/secondary/style.module.scss";
import {isActiveClass} from "@/shared/lib/helpers";
import GekkardAccount from "@/widgets/wallet/top-up/ui/EURG/GekkardAccount";
import BlockchainWallet from "@/widgets/wallet/top-up/ui/EURG/BlockchainWallet";

type TBtnTabs = "gekkard-account" | "blockchain-wallet"


const TopUpEURG = () => {

    const [btnTabs, setBtnTabs] = useState<TBtnTabs>("gekkard-account")

    return (<div className="wrapper">
        <div className="row flex gap-4 mb-7">
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
        </div>

        {btnTabs === "gekkard-account" && <GekkardAccount/>}
        {btnTabs === "blockchain-wallet" && <BlockchainWallet/>}

        <TopUpQR/>
    </div>)

};

export default TopUpEURG;
