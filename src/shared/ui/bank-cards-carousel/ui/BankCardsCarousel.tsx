import { Carousel } from "antd";
import { sortCards } from "../model/helpers";
import { CarouselRef } from "antd/lib/carousel";
import { useEffect, useRef, useState } from "react";
import { Card as ICardData } from "@/shared/(orval)api/gek/model";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import {
  formatCardNumber,
  formatMonthYear,
} from "@/widgets/dashboard/model/helpers";

interface IParams {
  cards: ICardData[];
  cardSize?: 'md' | 'lg';
  refreshKey?: string | null;
  onSelect?: (card: ICardData) => void;
}

const BankCardsCarousel = ({
  cards,
  cardSize,
  refreshKey,
  onSelect = () => { },
}: IParams) => {
  const carouselRef = useRef<CarouselRef>();
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
      <Carousel className="pb-6" draggable ref={(ref) => { if (!carouselRef.current) { carouselRef.current = ref; } }}
        afterChange={(i) => onSelect(cards[i])}>
        { cards?.map((card) => (
          <BankCard key={card.cardId}
            size={cardSize}
            status={card.cardStatus}
            cardNumber={formatCardNumber(card.displayPan)}
            expiresAt={formatMonthYear(new Date(card.expiryDate))}
            holderName={card.cardholder}
          />
        ))}
      </Carousel>    
  );
};

export default BankCardsCarousel;
