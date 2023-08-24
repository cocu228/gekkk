import BankCard from '../cards/bank-card/BankCard';
import {IResCard, apiGetCards} from '@/shared/api';
import {CtxRootData} from '@/processes/RootContext';
import {useContext, useEffect, useState} from 'react';
import CardsGrid from "@/shared/ui/cards-grid/CardsGrid";
import SkeletonCard from '../cards/skeleton-card/SkeletonCard';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import {formatCardNumber, formatMonthYear} from '../../model/helpers';

function CardsLayout() {
    const {account} = useContext(CtxRootData);
    const [cards, setCards] = useState<IResCard[]>(null);

    useEffect(() => {
        (async () => {
            const {data} = await apiGetCards();
            setCards(data.result);
        })();
    }, [account]);

    return (
        <div className="wrapper">
            <SectionTitle>Selected account: {account.number}</SectionTitle>

            <CardsGrid>
                <>
                    {!cards && [1, 2, 3, 4].map(() => (
                        <SkeletonCard/>
                    ))}

                    {cards?.map(c =>
                            <BankCard
                                key={`BANK_CARD_${c.cardId}`}
                                cardNumber={formatCardNumber(c.displayPan)}
                                expiresAt={formatMonthYear(new Date(c.expiryDate))}
                                holderName={c.cardholder}
                            />
                        )}
                </>
            </CardsGrid>
        </div>
    );
}

export default CardsLayout;
