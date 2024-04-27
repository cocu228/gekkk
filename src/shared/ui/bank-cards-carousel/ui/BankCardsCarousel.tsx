import Carousel from "@/shared/ui/carousel";
import { sortCards } from "../model/helpers";
import { useEffect, useRef, useState } from "react";
import { Card as ICardData } from "@/shared/(orval)api/gek/model";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import { formatCardNumber, formatMonthYear } from "@/widgets/dashboard/model/helpers";

interface IParams {
    cards: ICardData[];
    onItemClick?: () => void;
    refreshKey?: string | null;
    onSelect?: (card: ICardData) => void;
}

const BankCardsCarousel = ({
    cards,
    refreshKey,
    onSelect = () => {},
    onItemClick = () => {}
}: IParams) => {
    const carouselRef = useRef<HTMLDivElement>();
    const [selectedCard, setSelectedCard] = useState<ICardData>(null);

    useEffect(() => {
        if (cards) {
            const sortedCards = sortCards(cards);

            if (!selectedCard) {
                setSelectedCard(cards[0]);
                onSelect(sortedCards[0]);
            }
        }
    }, [cards, refreshKey]);

    return (
        <Carousel
            className="pb-6"
            onSelect={(i: number) => onSelect(cards[i])}
            ref={(ref) => {
                if (!carouselRef.current) {
                    carouselRef.current = ref;
                }
            }}
        >
            {cards?.map((card) => (
                <div onClick={onItemClick}>
                    <BankCard
                        key={card.cardId}
                        status={card.cardStatus}
                        holderName={card.cardholder}
                        cardNumber={formatCardNumber(card.displayPan)}
                        expiresAt={formatMonthYear(new Date(card.expiryDate))}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default BankCardsCarousel;
