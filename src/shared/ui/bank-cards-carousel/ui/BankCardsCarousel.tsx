import {Carousel} from "antd";
import {sortCards} from "../model/helpers";
import {CarouselRef} from "antd/lib/carousel";
import {useEffect, useRef, useState} from "react";
import {Card as ICardData} from "@/shared/(orval)api/shared/model";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";

interface IParams {
    cards: ICardData[];
    cardClassName?: string;
    wrapperClassName?: string;
    refreshKey?: string | null;
    onSelect?: (card: ICardData) => void;
}

const BankCardsCarousel = ({
    cards,
    refreshKey,
    cardClassName,
    onSelect = () => {}}: IParams
) => {
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
        <div className="max-h-[600px] max-w-[1000px]">
            {!cards ? (
                <div className='mb-[14px]'>
                    <SkeletonCard/>
                </div>
            ) : (
                <Carousel
                    draggable
                    ref={ref => {
                        if (!carouselRef.current) {
                            carouselRef.current = ref;
                        }
                    }}
                    afterChange={(i) => onSelect(cards[i])}
                >
                    {cards.map(card => (
                        <div className={`${cardClassName} mb-6`}>
                            <BankCard status={card.cardStatus}
                                      cardNumber={formatCardNumber(card.displayPan)}
                                      expiresAt={formatMonthYear(new Date(card.expiryDate))}
                                      holderName={card.cardholder}/>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

export default BankCardsCarousel;
