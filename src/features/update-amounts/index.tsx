import {storeListAllCryptoName, storeListAvailableBalance} from "@/shared/store/crypto-assets";
import {useState} from "react";
import {isActiveClass} from "@/shared/lib/helpers";
import styles from "./style.module.scss"

const UpdateAmounts = () => {

    const getListAllCryptoName = storeListAllCryptoName(state => state.getListAllCryptoName)
    const getDefaultListBalance = storeListAvailableBalance(state => state.getDefaultListBalance)
    const setSortedListBalance = storeListAvailableBalance(state => state.setSortedListBalance)

    const [active, setActive] = useState(false)
    const onClick = async () => {
        setActive(true)
        const listAllCryptoName = await getListAllCryptoName()

        await getDefaultListBalance();

        setSortedListBalance(listAllCryptoName);

        setTimeout(() => setActive(false), 3000)

    }

    return <div data-text={"Update"} className="ellipsis">
        <span className={`cursor-pointer ${styles.UpdateBtn} ${isActiveClass(active)}`}
              onClick={onClick}>
            <img width={20} height={20} src="/img/icon/DepositCurrentRateIcon.svg" alt="DepositCurrentRateIcon"/>
        </span>
    </div>
}

export default UpdateAmounts