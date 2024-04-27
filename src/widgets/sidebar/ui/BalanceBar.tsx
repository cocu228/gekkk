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

type Props = {
    NavLinkEvent: () => void,
}

const BalanceBar = ({ NavLinkEvent }: Props) => {

    const navigate = useNavigate();
    const { currencies, totalAmount } = useContext(CtxCurrencies);
    const { activeCards, loading: cardsLoading, getActiveCards } = storeActiveCards(state => state);
    const [params] = useSearchParams();
    const currency = params.get('currency');

    let eurWallet: ICtxCurrency = null;
    let eurgWallet: ICtxCurrency = null;
    let gkeWallet: ICtxCurrency = null;
    let secondaryWallets: ICtxCurrency[] = [];

    if (currencies !== null) {
        eurWallet = currencies.get("EUR");
        eurgWallet = currencies.get("EURG");
        gkeWallet = currencies.get("GKE");
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
                                onItemClick={() => navigate('/wallet?currency=EUR&tab=bank_cards')}
                            />
                        )}
            </div>
            <span className={styles.CurTypeTxt}>{t("fiat")}</span>
            {/* fiat wallets */}
            <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={eurWallet} />
            {/* Crypto wallets wrapper */}
            <span className={styles.CurTypeTxt}>{t("crypto_assets.title")}</span>
            {/* EURG wallet */}
            <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={eurgWallet} />
            {/* GKE wallet */}
            <TokenBar curActive={currency} navLinkEvent={NavLinkEvent} item={gkeWallet} />

            {/* Secondary options wrapper */}
            <div className="h-[6px]" />

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