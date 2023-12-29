import {Carousel} from "antd";
import {IResCard} from "@/shared/api";
import {sortCards} from "../model/helpers";
import {CarouselRef} from "antd/lib/carousel";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from 'react-router-dom';
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import NewBankCard from "@/widgets/dashboard/ui/cards/bank-card/NewBankCard";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";

interface IParams {
    newCardLink?: boolean;
    cardClassName?: string;
    wrapperClassName?: string;
    onSelect?: (card: IResCard) => void;
}

const BankCardsCarousel = ({
    newCardLink,
    cardClassName,
    onSelect = () => {}}: IParams
) => {
    const [params] = useSearchParams();
    const isNew = params.has("new");
    const navigate = useNavigate();
    const carouselRef = useRef<CarouselRef>();
    const bankCards = storeBankCards(state => state.bankCards);
    const [selectedCard, setSelectedCard] = useState<IResCard>(null);
    
    useEffect(() => {
        if (carouselRef.current) {
            const activeCardId = isNew ? bankCards.length - 1 : 0;
            
            carouselRef.current.goTo(activeCardId);
            onSelect(bankCards[activeCardId]);   
        }
    }, [isNew]);
    
    useEffect(() => {
        if (bankCards) {
            const sortedCards = sortCards(bankCards);
            
            if (!sortedCards.find(c => c.cardId === 'new')) {
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
            }
            
            if (!selectedCard) {
                setSelectedCard(bankCards[0]);
                onSelect(sortedCards[0]);
            }
        }
    }, [bankCards]);
    
    return (
        <div className="max-h-[600px] max-w-[1000px]">
            {!bankCards ? (
                <div className='scale-y-95 mb-[14px]'>
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
                    afterChange={(i) => onSelect(bankCards[i])}
                >
                    {bankCards.map(card => card.cardId === 'new' ? (
                        <div
                            className={`${cardClassName} mb-6`}
                            onClick={() => {
                                if (newCardLink) navigate("/wallet/EUR/bank_cards?new");
                            }}
                        >
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
