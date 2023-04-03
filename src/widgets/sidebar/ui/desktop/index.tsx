import styles from "./style.module.scss";
import Footer from "@/widgets/footer";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {apiGetRates} from "@/shared/api";
import {NavLink} from 'react-router-dom';
import {storeListAvailableBalance} from "@/shared/store/crypto-assets";
import {ParentClassForCoin, IconCoin} from "@/shared/ui/icons/icon-coin";
import totalizeAmount from "../../model/totalize-amount";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/sidebar/ui/nav-collapse/NavCollapse";
import Decimal from "decimal.js";
import SvgArrow from "@/shared/ui/icons/DepositAngleArrowIcon";

const SidebarDesktop = () => {

    const sortedListBalance = storeListAvailableBalance(state => state.sortedListBalance)
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))
    const [totalSum, setTotalSum] = useState<{ EUR: Decimal, BTC: Decimal }>({EUR: new Decimal(0), BTC: new Decimal(0)})

    const {sm, md} = useContext(BreakpointsContext)

    const NavLinkEvent = useCallback(() => (sm || md) ? toggleSidebar.current(false) : null, [sm, md])

    useEffect(() => {

        (async () => {

            const ratesEUR = await apiGetRates()
            const ratesBTC = await apiGetRates("BTC")

            if (sortedListBalance !== null) {
                const valueEUR: Decimal = totalizeAmount(sortedListBalance, ratesEUR.data)
                const valueBTC: Decimal = totalizeAmount(sortedListBalance, ratesBTC.data)

                setTotalSum({EUR: valueEUR, BTC: valueBTC})
            }


        })()

    }, []);

    const EURG = sortedListBalance.find(it => it.const === "EURG");
    const GKE = sortedListBalance.find(it => it.const === "GKE");

    console.log(EURG)
    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            <div className={`wrapper flex-col ml-4 pt-4 pb-5 flex ${styles.Wrapper}`}>
                <div className="row flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2">
                            <span className="text-gray-400 text-sm font-semibold">Asset valuation</span>
                        </div>
                        <div className="row"></div>
                        <span className="text-lg font-bold">{totalSum.EUR.toDecimalPlaces(2).toNumber()} € <br/> ({totalSum.BTC.toDecimalPlaces(6).toNumber()} ₿)</span>
                    </div>

                </div>
            </div>
            <NavLink onClick={NavLinkEvent} to={"wallet/EURG"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/EurgIcon.svg`}
                             alt="EURG"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin Europe</span>
                        </div>
                        <div className="row w-full">
                            <span
                                className={styles.Sum}>{EURG?.availableBalance.toDecimalPlaces(EURG.token.round_prec).toNumber() ?? 0} EURG</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink onClick={NavLinkEvent} to={"wallet/GKE"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/tokens/GkeIcon.svg`}
                             alt="GKE"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row text-gray-400 w-full mb-1"><span className={styles.Name}>Gekkoin Invest Token</span>
                        </div>
                        <div className="row w-full"><span
                            className={styles.Sum}>{GKE?.availableBalance.toDecimalPlaces(GKE.token.round_prec).toNumber() ?? 0} GKE</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink onClick={NavLinkEvent} to={"assets"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/Invest.svg`}
                             alt="Invest"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1 font-medium"><span
                            className={styles.NavName}>Crypto assets</span></div>
                    </div>
                </div>
            </NavLink>
            <NavCollapse header={"Assets"} id={"assets"}>
                {sortedListBalance.filter(it => it.const !== "EURG" && !it.availableBalance.equals(0)).map((item, i) =>
                    <NavLink onClick={NavLinkEvent} to={`wallet/${item.const}`} key={item.id}>
                        <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                            <div className="col flex items-center pl-4">
                                <SvgArrow width={14} height={14} className={styles.SvgArrow}/>
                                <IconCoin className={styles.Icon}
                                          coinName={item.name}
                                          iconName={`${item.const.toLowerCase().capitalize()}Icon.svg`}/>
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-6">
                                <div className="row w-full mb-1"><span
                                    className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span></div>
                                <div className="row w-full"><span
                                    className={styles.Sum}>{`${item.availableBalance.toDecimalPlaces(item.token.round_prec)} ${item.const}`}</span>
                                </div>
                                {/*<div className="row w-full"><span*/}
                                {/*    className="text-gray-400 text-sm">{`${item.freezeBalance} (hold)`}</span>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </NavLink>)}
            </NavCollapse>
            <NavLink onClick={NavLinkEvent} to={"exchange"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} className={styles.Icon} src={`/img/icon/ExchangeIcon.svg`}
                             alt="ExchangeIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1 font-medium"><span className={styles.NavName}>Exchange</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            {/*<NavCollapse header={"Private exchange rooms"} id={"exchange"}>*/}
            {/*    <p>Private exchange rooms</p>*/}
            {/*</NavCollapse>*/}
            <NavLink onClick={NavLinkEvent} to={"deposit"}>
                <div className={`${styles.Item}`}>
                    <div className="col flex items-center pl-4">
                        <img width={50} height={50} src={`/img/icon/NewDepositIcon.svg`}
                             alt="NewDepositIcon"/>
                    </div>
                    <div className="col flex items-center justify-center flex-col pl-6">
                        <div className="row w-full mb-1 font-medium"><span className={styles.NavName}>New deposit</span>
                        </div>

                    </div>
                </div>
            </NavLink>
            {/*<NavCollapse header={"Current deposit"} id={"deposit"}>*/}
            {/*    <p>Current deposit</p>*/}
            {/*</NavCollapse>*/}
        </div>
        {!sm && !md && <Footer textAlight={"text-left"}/>}
    </div>;
}

export default SidebarDesktop