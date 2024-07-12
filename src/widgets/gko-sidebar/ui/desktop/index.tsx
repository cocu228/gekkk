import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCallback, useContext, useRef } from "react";

import Footer from "@/widgets/footer";
import { IconCoin, ParentClassForCoin } from "@/shared/ui/icons/icon-coin";
import { storyToggleSidebar } from "@/widgets/gko-sidebar/model/story";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import NavCollapse from "@/widgets/gko-sidebar/ui/nav-collapse/NavCollapse";
import { storeInvestments } from "@/shared/store/investments/investments";
import { CtxCurrencies, ICtxCurrency } from "@/processes/CurrenciesContext";
import { toLocaleCryptoRounding, toLocaleFiatRounding } from "@/widgets/gko-sidebar/model/helpers";
import { getFixedDepositTitle, getStructedDepositTitle, scrollToTop } from "@/shared/lib/helpers";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";

const SidebarDesktop = () => {
  const { t } = useTranslation();
  const { currencies } = useContext(CtxCurrencies);
  const { sm, md } = useContext(BreakpointsContext);
  const toggleSidebar = useRef(storyToggleSidebar(state => state.toggle));
  const loc = useLocation();

  const { investments, totalAmount } = storeInvestments(state => state);

  const NavLinkEvent = useCallback(() => {
    scrollToTop();
    return sm || md ? toggleSidebar.current(false) : null;
  }, [sm, md]);

  let eurgWallet: ICtxCurrency = null;
  let gkeWallet: ICtxCurrency = null;

  if (currencies !== null) {
    eurgWallet = currencies.get("EURG");
    gkeWallet = currencies.get("GKE");
  }

  if (!investments) return null;

  console.log("asdas", gkeWallet);

  return (
    <div className={`${styles.Sidebar} flex flex-col justify-between`}>
      <div className='wrapper'>
        <div className='flex flex-col gap-[2px]'>
          {/* EURG wallet */}
          <NavLink
            to='/wallet?currency=EURG'
            className={`${styles.ItemWrapper} ${loc.search === "?currency=EURG" && styles.ItemWrapperActive}`}
          >
            <div className={`${styles.ItemInactive}`}>
              <IconApp code='t08' size={12} className={styles.ItemArrow} color='#285E69' />
              <div className={`${styles.ItemHover}`} />
              <div className='col flex items-center pl-4'>
                <IconCoin width={50} height={50} className={styles.IconCoin} code={`EURG`} />
              </div>
              <div className='col flex items-center mt-[5px] flex-col pl-5'>
                <div className='row text-gray-400 w-full h-[17px] mb-[6px]'>
                  <span className={styles.Name}>Gekkoin EUR</span>
                </div>
                <div className='row w-full h-[17px]'>
                  <span className={styles.Sum}>
                    {(eurgWallet && toLocaleFiatRounding(eurgWallet.balance.user_balance)) ?? "-"} EURG
                  </span>
                </div>
                {eurgWallet && (
                  <div className={"row w-full flex justify-between "}>
                    <div>
                      {!eurgWallet.lockInBalance ? null : (
                        <span className={styles.Income}>
                          +{toLocaleFiatRounding(eurgWallet.balance.lock_in_balance) ?? "-"}
                        </span>
                      )}
                    </div>
                    <div className=' text-gray-500 font-mono'>
                      {eurgWallet.userBalanceEUREqu === null ? null : (
                        <span className={styles.EuroEqv}>
                          ~ {toLocaleFiatRounding(eurgWallet.balance.user_balance_EUR_equ)} €
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </NavLink>

          {/* GKE wallet */}
          <NavLink
            to='/wallet?currency=GKE'
            className={`${styles.ItemWrapper} ${loc.search === "?currency=GKE" && styles.ItemWrapperActive}`}
          >
            <div className={`${styles.ItemInactive}`}>
              <IconApp code='t08' size={12} className={styles.ItemArrow} color='#285E69' />
              <div className={styles.ItemHover} />
              <div className='col flex items-center pl-4'>
                <IconCoin width={50} className={styles.IconCoin} height={50} code={`GKE`} />
              </div>
              <div className='col flex items-center mt-[5px] flex-col pl-5'>
                <div className='row text-gray-400 w-full h-[17px] mb-[6px]'>
                  <span className={`${styles.Name}`}>GKE Token</span>
                </div>
                <div className='row w-full h-[17px]'>
                  <span className={styles.Sum}>
                    {(gkeWallet && toLocaleCryptoRounding(gkeWallet.balance?.user_balance, gkeWallet.roundPrec)) ?? "-"}{" "}
                    GKE
                  </span>
                </div>
                {gkeWallet && gkeWallet.balance !== undefined && (
                  <div className={"row w-full flex justify-between"}>
                    <div>
                      {!gkeWallet.balance.lock_in_balance ? null : (
                        <span className={styles.Income}>
                          +{toLocaleCryptoRounding(gkeWallet.balance.lock_in_balance, gkeWallet.roundPrec) ?? "-"}
                        </span>
                      )}
                    </div>
                    <div className=' text-gray-500 font-mono'>
                      {gkeWallet.balance?.user_balance_EUR_equ === null ? null : (
                        <span className={styles.EuroEqv}>
                          ~ {toLocaleFiatRounding(gkeWallet.balance.user_balance_EUR_equ)} €
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </NavLink>
        </div>

        {/* Secondary options wrapper */}
        <div style={{ backgroundColor: "#f7f7f0" }} className='h-[8px] w-full' />
        <NavLink className='bg-[#fff] block' onClick={NavLinkEvent} to={"open-deposit"}>
          <div className={`${styles.Item}`}>
            <div className='col flex items-center pl-4'>
              <IconApp lib={3} code='t35' size={50} color='var(--color-gray-400)' />
            </div>
            <div className='col flex items-center justify-center flex-col pl-6'>
              <div className='row w-full font-medium'>
                <span className={styles.NavName}>New deposit</span>
              </div>
            </div>
          </div>
        </NavLink>

        {/* User assets collapse */}
        {!investments.length ? null : (
          <NavCollapse className='bg-[#fff] block' header={"Current deposits"} id={"deposits"}>
            {investments.map(item => (
              <NavLink onClick={NavLinkEvent} to={`deposit/${item.id}`} key={item.id}>
                <div className={`${`${styles.Item} ${ParentClassForCoin}`}`}>
                  <div className='col flex items-center pl-4 w-[85px]'>
                    <IconApp code='t66' size={15} color='var(--color-gray-400)' />
                    {/*<IconApp lib={3} code="t36" size={50} color="var(--color-gray-400)" />*/}
                    <img
                      style={{ marginLeft: "4px" }}
                      alt={"DepositGradientIcon.svg"}
                      className={styles.Icon}
                      src={"/img/icon/DepositGradientIcon.svg"}
                    />
                  </div>
                  <div className='col w-full flex items-center justify-center flex-col pl-6 pr-2'>
                    <div className='row w-full'>
                      <span className={`${styles.Name} text-gray-400 text-xs`}>
                        {[1, 101].includes(item.dep_type) ? "Fixed rate" : "Structured"} deposit
                      </span>
                    </div>

                    <div className='row w-full'>
                      <span className={styles.Sum}>{item.amount} €</span>
                    </div>

                    <div className='row w-full ellipsis ellipsis-c-none'>
                      <span className='text-gray-400 text-xs'>
                        {item.dep_type === 1 || item.dep_type === 101
                          ? getFixedDepositTitle(item.isGke)
                          : getStructedDepositTitle(item.dep_type, item.isGke)}
                      </span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </NavCollapse>
        )}

        <div className={`${styles.AssetInfo2} text-gray-500 font-mono`}>
          <span>{t("portfolio_size")}</span>
          <span>
            ~ <span data-testid='TotalAmount'>{toLocaleFiatRounding(+totalAmount) ?? "-"}</span> €
          </span>
        </div>
      </div>

      <Footer textAlight={"text-left"} />
    </div>
  );
};

export default SidebarDesktop;
