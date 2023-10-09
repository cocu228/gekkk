import {Carousel} from "antd";
import {IResCard} from "@/shared/api";
import {useEffect, useRef, useState} from "react";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";

interface IParams {
    cardId?: number;
    cards: IResCard[];
    cardClassName?: string;
    onCardClick?: () => void;
    onChange?: (id: number) => void;
}

const BankCardsCarousel = ({
    cards,
    onChange = () => {},
    cardId = 0,
    onCardClick,
    cardClassName
}: IParams) => {
    const carousel = useRef();
    const [current, setCurrent] = useState<number>(cardId);

    useEffect(() => {
        setCurrent(cardId);
    }, [cardId]);

    useEffect(() => {
        //@ts-ignore
        carousel.current.goTo(current);
    }, [current]);
    
    return (
        <Carousel
            ref={carousel}
            afterChange={v => {
                setCurrent(v);
                onChange(v);
            }}
        >
            {cards
                .map(card => (
                    <div className={`${cardClassName} scale-90 mb-5 hover:opacity-90`} onClick={onCardClick}>
                        <BankCard
                            status={card.cardStatus}
                            className="hover:shadow-none"
                            cardNumber={formatCardNumber(card.displayPan)}
                            expiresAt={formatMonthYear(new Date(card.expiryDate))}
                            holderName={card.cardholder}
                        />
                    </div>
                ))}
        </Carousel>
    )
}

export default BankCardsCarousel;
