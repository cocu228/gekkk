import {Carousel} from "antd";
import {IResCard} from "@/shared/api";
import {sortCards} from "../model/helpers";
import {useEffect, useRef, useState} from "react";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";
import NewBankCard from "@/widgets/dashboard/ui/cards/bank-card/NewBankCard";

interface IParams {
    cardClassName?: string;
    wrapperClassName?: string;
    displayUnavailable?: boolean;
    onSelect?: (card: IResCard) => void;
}

const BankCardsCarousel = ({cardClassName, displayUnavailable, onSelect = () => {}}: IParams) => {
    const carousel = useRef();
    const bankCards = storeBankCards(state => state.bankCards);
    const [displayedCards, setDisplayedCards] = useState<IResCard[]>(null);
    
    useEffect(() => {
        if (bankCards) {
            const filteredCards = bankCards.filter(card =>
                !displayUnavailable
                    ? card.cardStatus === "ACTIVE"
                    : card
            );
            
            const sortedCards = sortCards(filteredCards);
            
            sortedCards.push({
                cardId: 'new',
                type: null,
                limits: null,
                isVirtual: null,
                cardStatus: null,
                displayPan: null,
                cardholder: null,
                expiryDate: null,
                productType: null
            });
            
            setDisplayedCards(sortedCards);
            onSelect(sortedCards[0]);
        }
    }, [bankCards, displayUnavailable]);
    
    return (
        <div className="max-h-[600px] max-w-[1000px]">
            {!displayedCards ? (
                <div className='scale-y-95 mb-[14px]'>
                    <SkeletonCard/>
                </div>
            ) : (
                <Carousel draggable ref={carousel} afterChange={(i) => onSelect(displayedCards[i])}>
                    {displayedCards.map(card => card.cardId === 'new' ? (
                        <div className={`${cardClassName} mb-6`}>
                            <NewBankCard/>
                        </div>
                    ) : (
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
