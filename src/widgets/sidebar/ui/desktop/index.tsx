import styles from "./style.module.scss";
import Footer from "@/widgets/footer";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {apiGetRates, apiInvestments, IResInvestments} from "@/shared/api";
import {NavLink} from 'react-router-dom';
import {ParentClassForCoin, IconCoin} from "@/shared/ui/icons/icon-coin";
import totalizeAmount from "../../model/totalize-amount";
import {storyToggleSidebar} from "@/widgets/sidebar/model/story";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/sidebar/ui/nav-collapse/NavCollapse";
import Decimal from "decimal.js";
import SvgArrow from "@/shared/ui/icons/DepositAngleArrowIcon";
import UpdateAmounts from "../../../../features/update-amounts";
import {helperFilterList} from "@/widgets/sidebar/model/helpers";
import {CtxCurrencyData} from "@/app/CurrenciesContext";
import $const from "@/shared/config/coins/constants";
import {getTypeTitle} from "@/widgets/dashboard/ui/layouts/DepositLayout";
import {formatDate} from "@/widgets/dashboard/model/helpers";

const SidebarDesktop = () => {

    const {currencies, refreshKey} = useContext(CtxCurrencyData);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle))

    const [totalSum, setTotalSum] = useState<{ EUR: Decimal, BTC: Decimal }>({EUR: new Decimal(0), BTC: new Decimal(0)})

    const {sm, md} = useContext(BreakpointsContext)

    const NavLinkEvent = useCallback(() => (sm || md) ? toggleSidebar.current(false) : null, [sm, md])


    const [investments, setInvestments] = useState<IResInvestments[]>([])

    useEffect(() => {

        (async () => {
            const {data} = await apiInvestments();
            setInvestments(data.result);
        })()

    }, []);


    useEffect(() => {

        (async () => {

            const ratesEUR = await apiGetRates()
            const ratesBTC = await apiGetRates("BTC")


            const valueEUR: Decimal = totalizeAmount(currencies, ratesEUR.data.result)
            const valueBTC: Decimal = totalizeAmount(currencies, ratesBTC.data.result)

            setTotalSum({EUR: valueEUR, BTC: valueBTC})


        })()

    }, [refreshKey]);

    const eurgWallet = currencies.get("EURG");
    const gkeWallet = currencies.get("GKE");

    const secondaryWallets = Array.from(currencies.values()).filter(it => {
        if ([$const.EURG, $const.GKE].includes(it.currency)) return false;

        return it.availableBalance || it.availableBalance?.comparedTo(0);
    });

    return <div className={`${styles.Sidebar} flex flex-col justify-between`}>
        <div className="wrapper">
            <div className={`wrapper flex-col ml-4 pt-4 pb-5 flex ${styles.Wrapper}`}>
                <div className="row flex justify-between w-full">
                    <div className="col">
                        <div className="row mb-2 flex">
                            <span className="text-gray-400 text-sm font-semibold mr-3">Asset valuation</span>
                            <UpdateAmounts/>
                        </div>
                        <div className="row"></div>
                        <span
                            className="text-lg font-bold">{totalSum.EUR.toDecimalPlaces(2).toNumber()} € ({totalSum.BTC.toDecimalPlaces(6).toNumber()} ₿)</span>
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
                                className={styles.Sum}>{eurgWallet.availableBalance?.toDecimalPlaces(eurgWallet.roundPrec).toNumber() ?? 0} EURG</span>
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
                        <div className="row w-full">   <span
                            className={styles.Sum}>{gkeWallet.availableBalance?.toDecimalPlaces(gkeWallet.roundPrec).toNumber() ?? 0} GKE</span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
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
            {!secondaryWallets.length ? null : (
                <NavCollapse header={"Assets"} id={"assets"}>
                    {helperFilterList(secondaryWallets).map((item, i) =>
                        <NavLink onClick={NavLinkEvent} to={`wallet/${item.currency}`} key={item.id}>
                            <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                                <div className="col flex items-center pl-4">
                                    <SvgArrow width={14} height={14} className={styles.SvgArrow}/>
                                    <IconCoin className={styles.Icon}
                                              code={item.currency}/>
                                </div>
                                <div className="col flex items-center justify-center flex-col pl-6">
                                    <div className="row w-full mb-1"><span
                                        className={`${styles.Name} text-gray-400 text-xs`}>{item.name}</span></div>
                                    <div className="row w-full"><span
                                        className={styles.Sum}>{`${item.availableBalance?.toDecimalPlaces(item.roundPrec)} ${item.currency}`}</span>
                                    </div>
                                    <div className="row w-full"><span
                                        className="text-gray-400 text-sm">{`${item.lockInBalance} (hold)`}</span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>)}
                </NavCollapse>
            )}
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
            <NavLink onClick={NavLinkEvent} to={"new-deposit"}>
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
            {!investments.length ? null : <NavCollapse header={"Current deposit"} id={"deposit"}>
                {investments.map((item, i) =>
                    <NavLink onClick={NavLinkEvent} to={`${item.dep_type}`} key={item.id}>
                        <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                            <div className="col flex items-center pl-4">
                                <SvgArrow width={14} height={14} className={styles.SvgArrow}/>
                                <img alt={"DepositIcon.svg"} className={styles.Icon}
                                     src={"/img/icon/DepositIcon.svg"}/>
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-6">
                                <div className="row w-full mb-1"><span
                                    className={`${styles.Name} text-gray-400 text-xs`}>Structured deposit, until {formatDate(new Date(item.date_end))}</span>
                                </div>
                                <div className="row w-full"><span
                                    className={styles.Sum}>{item.amount} €</span>
                                </div>
                                <div className="row w-full"><span
                                    className="text-gray-400 text-sm">{getTypeTitle(item.dep_type)}</span>
                                </div>
                            </div>
                        </div>
                    </NavLink>)}
            </NavCollapse>}
        </div>
        {!sm && !md && <Footer textAlight={"text-left"}/>}
    </div>;
}

export default SidebarDesktop;
