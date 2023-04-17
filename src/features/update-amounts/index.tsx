import {storeListAllCryptoName, storeListAvailableBalance} from "@/shared/store/crypto-assets";

const UpdateAmounts = () => {
    const getListAllCryptoName = storeListAllCryptoName(state => state.getListAllCryptoName)
    const getDefaultListBalance = storeListAvailableBalance(state => state.getDefaultListBalance)
    const setSortedListBalance = storeListAvailableBalance(state => state.setSortedListBalance)
    const onClick = async () => {

        const listAllCryptoName = await getListAllCryptoName()

        console.log(listAllCryptoName)

        await getDefaultListBalance();

        setSortedListBalance(listAllCryptoName);

    }

    return <>
        <span data-text={"Update"} className="cursor-pointer ellipsis" onClick={onClick}>
            <img width={20} height={20} src="/img/icon/DepositCurrentRateIcon.svg" alt="DepositCurrentRateIcon"/>
        </span>
    </>
}

export default UpdateAmounts