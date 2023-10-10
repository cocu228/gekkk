import {useEffect, useState} from "react";
import Modal from "@/shared/ui/modal/Modal";
import UseModal from "@/shared/model/hooks/useModal";
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import SkeletonCard from "@/widgets/dashboard/ui/cards/skeleton-card/SkeletonCard";
import BankCardMenu from "@/widgets/wallet/header/ui/bank-cards/menu/BankCardMenu";
import BankCardsCarousel from "@/widgets/wallet/header/ui/bank-cards/carousel/BankCardsCarousel";

const BankCards = () => {
    const bankCardsModal = UseModal();
    const [selectedCard, setSelectedCard] = useState<number>(0);
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
            setDisplayUnavailableCards(true);
        }
    }, [displayUnavailableCards]);
    
    const toggleUnavailableCards = () => {
        setSelectedCard(0);
        setValue(() => ({displayUnavailable: !displayUnavailableCards}));
        setDisplayUnavailableCards((prev: boolean) => !prev);
    }
    
    return (<>
        <div className="h-[200px] w-[310px] -mt-16 mr-20 -xxl:-mb-10 lg:scale-75 lg:mr-0">
            {!bankCards?.length ? (
                <div className={"scale-90"}>
                    <SkeletonCard/>
                </div>
            ) : (<>
                <BankCardsCarousel
                    cards={bankCards}
                    cardId={selectedCard}
                    onChange={setSelectedCard}
                    onCardClick={bankCardsModal.showModal}
                />
                
                <Modal
                    width={450}
                    open={bankCardsModal.isModalOpen}
                    onCancel={bankCardsModal.handleCancel}
                    title={<div>
                        Card CARD_NUMBER
                        <br/>
                        <span className={'flex align-middle mt-1 font-normal text-gray-400'}>
                            <Checkbox
                                onChange={toggleUnavailableCards}
                                defaultChecked={displayUnavailableCards}
                            /> Display unavailable cards
                        </span>
                    </div>}
                >
                    <div className={"-mt-10"}>
                        <BankCardsCarousel
                            cards={bankCards}
                            cardId={selectedCard}
                            onChange={setSelectedCard}
                            cardClassName={'ml-4'}
                        />
                    </div>
                    
                    <div className={'mt-4'}>
                        <BankCardMenu card={bankCards[selectedCard]}/>
                    </div>
                </Modal>
            </>)}
        </div>
    </>);
}

export default BankCards;
