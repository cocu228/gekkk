import styles from "./desktop.module.scss"
import Footer from "@/widgets/footer";
import {useEffect, useState} from "react";
import {apiGetRates} from "@/shared/api";
import {NavLink} from 'react-router-dom';
import {storeListAvailableBalance} from "@/shared/store/crypto-assets";
import {ParentClassForCoin, IconCoin} from "@/shared/ui/icon-coin";
import totalizeAmount from "../module/totalize-amount";


const SidebarDesktop = () => {

    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const [totalSum, setTotalSum] = useState<{ EUR: number, BTC: number }>({EUR: 0.0000, BTC: 0.0000})

    useEffect(() => {

        (async () => {

            const ratesEUR = await apiGetRates()
            const ratesBTC = await apiGetRates("BTC")

            if (sortedListBalance !== null) {
                const valueEUR: number = totalizeAmount(sortedListBalance, ratesEUR.data)
                const valueBTC: number = totalizeAmount(sortedListBalance, ratesBTC.data)

                setTotalSum({EUR: valueEUR, BTC: valueBTC})
            }


        })()

    }, [])

    const EURG = sortedListBalance.filter(it => it.const === "EURG")[0]

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            <div className={`wrapper flex-col ml-4 pt-12 pb-8 flex ${styles.Wrapper}`}>
                <div className="row flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2">
                            <span className="text-gray text-sm font-semibold">Asset valuation</span>
                        </div>
                        <div className="row"></div>
                        <span className="text-lg font-bold">{totalSum.EUR} €  ({totalSum.BTC} ₿)</span>
                    </div>

                </div>
            </div>
            <NavLink to={"wallet/EURG"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Coin} src={`/img/tokens/EurgIcon.svg`}
                             alt="EURG"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span>EURG Gekkoin</span></div>
                        <div className="row w-full">
                            <span
                                className="text-gray text-sm">{+EURG?.availableBalance ?? 0} EURG</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"wallet/GKE"}>
            <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Coin} src={`/img/tokens/GkeIcon.svg`}
                             alt="GKE"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span>Gekkoin Invest Token</span></div>
                        <div className="row w-full"><span
                            className="text-gray text-sm">0.0000 GKE</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"exchange"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/ExchangeIcon.svg`}
                             alt="ExchangeIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span>Exchange</span></div>

                    </div>
                </div>
            </NavLink>
            <NavLink to={"deposit"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/NewDepositIcon.svg`}
                             alt="NewDepositIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span>New deposit</span></div>

                    </div>
                </div>
            </NavLink>
            <div className={`flex flex-nowrap justify-end pr-4 pt-3`}>
                <span className="text-gray text-sm mr-2">Currents deposit</span>
                <img width={8} src="/img/icon/PrevDepositsIcon.svg" alt="green-array"/>
            </div>
            <NavLink to={"assets"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/Invest.svg`}
                             alt="Invest"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span>Crypto assets</span></div>
                    </div>
                </div>
            </NavLink>
            <div className={`flex flex-nowrap justify-end pr-4 pt-3`}>
                <span className="text-gray text-sm mr-2">Assets</span>
                <img width={8} src="/img/icon/PrevDepositsIcon.svg" alt="green-array"/>
            </div>

            {sortedListBalance.map((item, i) =>
                <NavLink to={`wallet/${item.const}`} key={item.id}
                         className={`${styles.Item + " " + ParentClassForCoin} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img className={`${styles.Coin} mr-3`} width={14} height={14}
                             src={`/img/icon/DepositAngleArrowIcon.svg`}
                             alt={"DepositAngleArrowIcon"}/>
                        <IconCoin coinName={item.name} iconName={`${item.const.toLowerCase().capitalize()}Icon.svg`}/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span
                            className="text-gray text-xs">{item.name}</span></div>
                        <div className="row w-full"><span
                            className="text-lg">{`${item.availableBalance} ${item.const}`}</span>
                        </div>
                        <div className="row w-full"><span
                            className="text-gray text-sm">{`${item.freezeBalance} (hold)`}</span>
                        </div>
                    </div>
                </NavLink>)}
        </div>

        <Footer/>

    </div>;
}

export default SidebarDesktop