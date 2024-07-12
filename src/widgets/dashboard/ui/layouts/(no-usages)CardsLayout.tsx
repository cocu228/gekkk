import { useContext } from "react";
import BankCard from "../cards/bank-card/BankCard";
import { CtxRootData } from "@/processes/RootContext";
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SkeletonCard from "../cards/skeleton-card/SkeletonCard";
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import { formatCardNumber, formatMonthYear } from "../../model/helpers";

function CardsLayout() {
  const { account } = useContext(CtxRootData);
  const bankCards = storeActiveCards(state => state.activeCards);

  return (
    <div className='wrapper'>
      <SectionTitle>Selected account: {account.number}</SectionTitle>

      <CardsGrid>
        <>
          {!bankCards && [1, 2, 3, 4].map(() => <SkeletonCard />)}

          {bankCards?.map(c => (
            <BankCard
              status={c.cardStatus}
              key={`BANK_CARD_${c.cardId}`}
              cardNumber={formatCardNumber(c.displayPan)}
              expiresAt={formatMonthYear(new Date(c.expiryDate))}
              holderName={c.cardholder}
            />
          ))}
        </>
      </CardsGrid>
    </div>
  );
}

export default CardsLayout;
