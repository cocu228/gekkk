import {Carousel} from "antd";
import {IResCard} from "@/shared/api";
import {useEffect, useRef, useState} from "react";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import BankCard from "@/widgets/dashboard/ui/cards/bank-card/BankCard";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";

interface IParams {
    cardClassName?: string;
    wrapperClassName?: string;
    onSelect?: (card: IResCard) => void;
}

const BankCardsCarousel = ({cardClassName, onSelect = () => {}}: IParams) => {
    const carousel = useRef();
    const [value, setValue] = useSessionStorage("cards-settings", {
        displayUnavailable: null
    });
    const initActiveStorage = value.displayUnavailable !== null ? value.displayUnavailable : false;
    const [displayUnavailableCards, setDisplayUnavailableCards] = useState(initActiveStorage);
    const bankCards = storeBankCards(state => state.bankCards)?.filter(card =>
        !displayUnavailableCards
            ? card.cardStatus === "ACTIVE"
            : card
    );
    
    useEffect(() => {
        if (!displayUnavailableCards && !bankCards?.length) {
            setValue({displayUnavailable: true});
            setDisplayUnavailableCards(true);
        }
    }, [bankCards]);
    
    return (
        <div className="max-h-[600px] max-w-[1000px]">
            {!bankCards?.length ? (
                <div>
                    <SkeletonCard/>
                </div>) : (<> <Carousel draggable ref={carousel} afterChange={(i) => onSelect(bankCards[i])}>
                    {bankCards.map(card => (
                            <div className={`${cardClassName} mb-6`}>
                                <BankCard status={card.cardStatus}
                                    cardNumber={formatCardNumber(card.displayPan)}
                                    expiresAt={formatMonthYear(new Date(card.expiryDate))}
                                    holderName={card.cardholder}/>
                            </div>
                        ))}
                </Carousel></>)}
        </div>
    )
}

export default BankCardsCarousel;
