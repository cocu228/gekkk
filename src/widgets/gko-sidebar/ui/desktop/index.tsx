// @ts-nocheck
import Footer from "@/widgets/footer";
import styles from "./style.module.scss";
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useCallback, useContext, useRef} from "react";
import SvgArrow from "@/shared/ui/icons/DepositAngleArrowIcon";
import {IconCoin, ParentClassForCoin} from "@/shared/ui/icons/icon-coin";
import {storyToggleSidebar} from "@/widgets/gko-sidebar/model/story";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/gko-sidebar/ui/nav-collapse/NavCollapse";
import {storeInvestments} from "@/shared/store/investments/investments";
import {CtxCurrencies, ICtxCurrency} from "@/processes/CurrenciesContext";
import {toLocaleCryptoRounding, toLocaleFiatRounding} from "@/widgets/gko-sidebar/model/helpers";
import {getFixedDepositTitle, getStructedDepositTitle, scrollToTop} from "@/shared/lib/helpers";

const SidebarDesktop = () => {
    const {t} = useTranslation();
    const {currencies} = useContext(CtxCurrencies);
    const {sm, md} = useContext(BreakpointsContext);
    const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));


    const {
        investments,
        totalAmount
    } = storeInvestments(state => state);

    if (!investments) return null

    const NavLinkEvent = useCallback(() => {
        scrollToTop();
        return (sm || md) ? toggleSidebar.current(false) : null;
    }, [sm, md]);

    let eurgWallet: ICtxCurrency = null;
    let gkeWallet: ICtxCurrency = null;

    if (currencies !== null) {
        eurgWallet = currencies.get("EURG");
        gkeWallet = currencies.get("GKE");
    }

    return (
        <div className={`${styles.Sidebar} flex flex-col justify-between`}>
            <div className="wrapper">
                {/* EURG wallet */}
                <div>
                    <div className={styles.ItemWrapper}>
                        <div className={`${styles.ItemInactive}`}>
                            <div className="col flex items-center pl-4">
                                <IconCoin width={50} height={50} code={`EURG`}
                                          alt="EURG"/>
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-5">
                                <div className="row text-gray-400 w-full mb-1">
                                    <span className={styles.Name}>Gekkoin euro token</span>
                                </div>
                                <div className="row w-full font-mono">
                                        <span
                                            className={styles.Sum}>{(eurgWallet && toLocaleFiatRounding(eurgWallet.balance.user_balance)) ?? '-'} EURG</span>
                                </div>
                                {eurgWallet && <div className={"row w-full flex justify-between "}>
                                    <div>
                                        {!eurgWallet.lockInBalance ? null : <span className={styles.Income}>
                                                    +{toLocaleFiatRounding(eurgWallet.balance.lock_in_balance) ?? '-'}
                                                </span>}
                                    </div>
                                    <div className=" text-gray-500 font-mono">
                                        {eurgWallet.userBalanceEUREqu === null ? null :
                                            <span className={styles.EuroEqv}>
                                                    ~ {toLocaleFiatRounding(eurgWallet.balance.user_balance_EUR_equ)} €
                                                </span>}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* GKE wallet */}
                <div>
                    <div className={styles.ItemWrapper}>
                        <div className={`${styles.ItemInactive}`}>
                            <div className="col flex items-center pl-4">
                                <IconCoin width={50} height={50} code={`GKE`}
                                          alt="GKE"/>
                            </div>
                            <div className="col flex items-center justify-center flex-col pl-5">
                                <div className="row text-gray-400 w-full mb-1">
                                    <span className={`${styles.Name}`}>Gekkoin invest token</span>
                                </div>
                                <div className="row w-full font-mono">
                                    <span className={styles.Sum}>
                                        {(gkeWallet && toLocaleCryptoRounding(gkeWallet.balance?.user_balance, gkeWallet.roundPrec)) ?? '-'} GKE
                                    </span>
                                </div>
                                {gkeWallet && gkeWallet.balance !== undefined &&
                                    <div className={"row w-full flex justify-between"}>
                                        <div>
                                            {!gkeWallet.balance.lock_in_balance ? null :
                                                <span className={styles.Income}>
                                                    +{toLocaleCryptoRounding(gkeWallet.balance.lock_in_balance, gkeWallet.roundPrec) ?? '-'}
                                                </span>}
                                        </div>
                                        <div className=" text-gray-500 font-mono">
                                            {gkeWallet.balance?.user_balance_EUR_equ ? null :
                                                <span className={styles.EuroEqv}>
                                                    ~ {toLocaleFiatRounding(gkeWallet.balance.user_balance_EUR_equ)} €
                                                </span>}
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary options wrapper */}
                <div style={{backgroundColor: "#f7f7f0"}} className="h-[8px] w-full"/>

                <NavLink onClick={NavLinkEvent} to={"open-deposit"}>
                    <div className={`${styles.Item}`}>
                        <div className="col flex items-center pl-4">
                            <img width={50} height={50} src={`/img/icon/DepositGradientIcon.svg`}
                                 alt="DepositGradientIcon"/>
                        </div>
                        <div className="col flex items-center justify-center flex-col pl-6">
                            <div className="row w-full mb-1 font-medium"><span
                                className={styles.NavName}>New deposit</span>
                            </div>
                        </div>
                    </div>
                </NavLink>

                {/* User assets collapse */}
                {!investments.length ? null : (
                    <NavCollapse header={"Current deposits"} id={"deposits"}>
                        {investments.map((item, i) =>
                            <NavLink onClick={NavLinkEvent} to={`deposit/${item.id}`} key={item.id}>
                                <div className={`${styles.Item + " " + ParentClassForCoin}`}>
                                    <div className="col flex items-center pl-4 w-[85px]">
                                        <SvgArrow width={14} height={14} className={styles.SvgArrow}/>
                                        <img alt={"DepositGradientIcon.svg"} className={styles.Icon}
                                             src={"/img/icon/DepositGradientIcon.svg"}/>
                                    </div>
                                    <div className="col w-full flex items-center justify-center flex-col pl-6 pr-2">
                                        <div className="row w-full">
                                        <span className={`${styles.Name} text-gray-400 text-xs`}>
                                            {[1, 101].includes(item.dep_type) ? 'Fixed rate' : 'Structured'} deposit
                                        </span>
                                        </div>

                                        <div className="row w-full">
                                            <span className={styles.Sum}>{item.amount} €</span>
                                        </div>

                                        <div className="row w-full ellipsis ellipsis-c-none">
                                        <span
                                            className="text-gray-400 text-xs">{(item.dep_type === 1 || item.dep_type === 101)
                                            ? getFixedDepositTitle(item.isGke)
                                            : getStructedDepositTitle(item.dep_type, item.isGke)}</span>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        )}
                    </NavCollapse>
                )}

                <div className={styles.AssetInfo2 + " text-gray-500 font-mono"}>
                    <span>{t("portfolio_size")}</span>
                    <span>~ <span
                        data-testid="TotalAmount">{toLocaleFiatRounding(+totalAmount) ?? '-'}</span> €</span>
                </div>
            </div>

            <Footer textAlight={"text-left"}/>
        </div>
    );
}

export default SidebarDesktop;
