import styles from "./style.module.scss";
import Footer from "@/widgets/footer";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {apiGetRates} from "@/shared/api";
import {NavLink} from 'react-router-dom';
import {storeListAvailableBalance} from "@/shared/store/crypto-assets";
import {ParentClassForCoin, IconCoin} from "@/shared/ui/icon-coin";
import totalizeAmount from "../../model/totalize-amount";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/sidebar/ui/collapse-nav-link/NavCollapse";

const SidebarDesktop = () => {

    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))
    const [totalSum, setTotalSum] = useState<{ EUR: number, BTC: number }>({EUR: 0.0000, BTC: 0.0000})

    const {sm} = useContext(BreakpointsContext)

    const NavLinkEvent = useCallback(() => sm ? toggleSidebar.current(false) : null, [sm])

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

    }, []);

    const EURG = sortedListBalance.find(it => it.const === "EURG");

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            <div className={`wrapper flex-col ml-4 pt-12 pb-8 flex ${styles.Wrapper}`}>
                <div className="row flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2">
                            <span className="text-gray-400 text-sm font-semibold">Asset valuation</span>
                        </div>
                        <div className="row"></div>
                        <span className="text-lg font-bold">{totalSum.EUR} €  ({totalSum.BTC} ₿)</span>
                    </div>

                </div>
            </div>
            <NavLink onClick={NavLinkEvent} to={"wallet/EURG"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Coin} src={`/img/tokens/EurgIcon.svg`}
                             alt="EURG"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>EURG Gekkoin</span>
                        </div>
                        <div className="row w-full">
                            <span
                                className="text-gray-600 text-sm">{+EURG?.availableBalance ?? 0} EURG</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink onClick={NavLinkEvent} to={"wallet/GKE"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Coin} src={`/img/tokens/GkeIcon.svg`}
                             alt="GKE"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin Invest Token</span>
                        </div>
                        <div className="row w-full"><span
                            className="text-gray-600 text-sm">0.0000 GKE</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink onClick={NavLinkEvent} to={"assets"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/Invest.svg`}
                             alt="Invest"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span className={styles.Name}>Crypto assets</span></div>
                    </div>
                </div>
            </NavLink>
            <NavCollapse header={"Assets"} id={"assets"}>
                {sortedListBalance.map((item, i) =>
                    <NavLink onClick={NavLinkEvent} to={`wallet/${item.const}`} key={item.id}>
                        <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                            <div className="col flex items-center pl-4">
                                <img className={`${styles.Coin} mr-3`}
                                     width={14}
                                     height={14}
                                     src={`/img/icon/DepositAngleArrowIcon.svg`}
                                     alt={"DepositAngleArrowIcon"}/>
                                <IconCoin className={styles.Coin}
                                          coinName={item.name}
                                          iconName={`${item.const.toLowerCase().capitalize()}Icon.svg`}/>
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-6">
                                <div className="row w-full mb-1"><span
                                    className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span></div>
                                <div className="row w-full"><span
                                    className="text-lg text-gray-600">{`${item.availableBalance} ${item.const}`}</span>
                                </div>
                                <div className="row w-full"><span
                                    className="text-gray-400 text-sm">{`${item.freezeBalance} (hold)`}</span>
                                </div>
                            </div>
                        </div>
                    </NavLink>)}
            </NavCollapse>
            <NavLink onClick={NavLinkEvent} to={"exchange"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/ExchangeIcon.svg`}
                             alt="ExchangeIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span className={styles.Name}>Exchange</span></div>

                    </div>
                </div>
            </NavLink>
            <NavCollapse header={"Private exchange rooms"} id={"exchange"}>
                <p>Private exchange rooms</p>
            </NavCollapse>
            <NavLink onClick={NavLinkEvent} to={"deposit"}>
                <div className={`${styles.Item} hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/NewDepositIcon.svg`}
                             alt="NewDepositIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1"><span className={styles.Name}>New deposit</span></div>

                    </div>
                </div>
            </NavLink>
            <NavCollapse header={"Current deposit"} id={"deposit"}>
                <p>Current deposit</p>
            </NavCollapse>
        </div>
        <Footer/>
    </div>;
}

export default SidebarDesktop