import { useContext } from 'react';
import styles from "./style.module.css";
import { toLocaleFiatRounding } from '@/shared/lib/number-format-helper';
import BankCardsCarousel from '@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel';
import NewBankCard from '@/widgets/dashboard/ui/cards/bank-card/NewBankCard';
import SkeletonCard from '@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard';
import { t } from 'i18next';
import { helperFilterList } from '../model/helpers';
import TokenBar from './TokenBar';
import { CtxCurrencies, ICtxCurrency } from '@/processes/CurrenciesContext';
import { storeActiveCards } from '@/shared/store/active-cards/activeCards';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Carousel from '@/shared/ui/carousel';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';

type Props = {
    NavLinkEvent: () => void,
}

const BalanceBar = ({ NavLinkEvent }: Props) => {

    const navigate = useNavigate();
    const {md} = useBreakpoints();
    const { currencies, totalAmount } = useContext(CtxCurrencies);
    const { activeCards, loading: cardsLoading } = storeActiveCards(state => state);
    const [params] = useSearchParams();
    const currency = params.get('currency');

    let eurWallet: ICtxCurrency = null;
    let eurgWallet: ICtxCurrency = null;
    let gkeWallet: ICtxCurrency = null;
    let btcWallet: ICtxCurrency = null
    let usdtWallet: ICtxCurrency = null
    let ethWallet: ICtxCurrency = null
    let secondaryWallets: ICtxCurrency[] = [];

    const gekwalletMode = global.VITE_APP_TYPE.toLowerCase().includes("gekwallet");
    const gekkardMode = global.VITE_APP_TYPE.toLowerCase().includes("gekkard");
    
    if (currencies !== null) {
        eurWallet = currencies.get("EUR");
        eurgWallet = currencies.get("EURG");
        gkeWallet = currencies.get("GKE");
        btcWallet = currencies.get("BTC");
        usdtWallet = currencies.get("USDT");
        ethWallet = currencies.get("ETH");
        secondaryWallets = Array.from(currencies.values());
    }

    return (
        <>
            <div className={styles.CardInfo}>
                {cardsLoading ? <SkeletonCard />
                    : !activeCards ? ""
                        : activeCards?.length === 0 ? (
                            <Carousel>
                                <div onClick={() => navigate('/wallet?currency=EUR&tab=bank_cards&new')}>
                                    <NewBankCard />
                                </div>
                            </Carousel>
                        ) : (
                            <BankCardsCarousel
                                cards={activeCards}
                                onItemClick={() => navigate(md
                                    ? 'card-menu'
                                    : '/wallet?currency=EUR&tab=bank_cards'
                                )}
                            />
                        )}
            </div>
            
            {gekkardMode && 
                <> 
                    <span className={styles.CurTypeTxt}>{t("fiat")}</span>
                    {/* fiat wallets */}
                    <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={eurWallet} />
                    {/* Crypto wallets wrapper */}
                    <span className={styles.CurTypeTxt}>{t("crypto_assets.title")}</span>
                    {/* EURG wallet */}
                    <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={eurgWallet} />
                    {/* GKE wallet */}
                    <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={gkeWallet} />
                </>
            }
            
            {gekwalletMode && 
                <>
                    {/* BTC wallet */}
                    <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={btcWallet} />
                    {/* USDT wallet */}
                    <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={usdtWallet} />
                    {/* ETH wallet */}
                    <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={ethWallet} />
                </>
            }

            {/* Secondary options wrapper */}
            {/* <div className="h-[6px]" /> */}

            {/* User assets collapse */}
            {!secondaryWallets.length ? null : (
                helperFilterList(secondaryWallets).map((item) =>
                    <TokenBar navLinkEvent={NavLinkEvent} curActive={currency} item={item} key={item.id} />)
            )}

            <div className={styles.TotalBal}>
                <span>{t("total_balance")}</span>
                <span className={styles.TotalBalSum} data-testid="TotalAmount">{toLocaleFiatRounding(totalAmount?.toNumber()) ?? '...'}</span>
            </div>
        </>
    )
}

export default BalanceBar