import {Switch} from "antd";
import Loader from "@/shared/ui/loader";
import Modal from "@/shared/ui/modal/Modal";
import MenuItem from "./menu-item/MenuItem";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {apiUpdateCard, IResCard} from "@/shared/api";
import {numberWithSpaces} from "@/shared/lib/helpers";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {MouseEvent, useContext, useEffect, useState} from "react";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import BankCardsCarousel from "@/features/bank-cards-carousel/ui/BankCardsCarousel";

const CardsMenu = () => {
    const confirmationModal = useModal();
    const {currencies} = useContext(CtxCurrencies);
    const eurWallet = currencies.get('EUR');
    const [card, setCard] = useState<IResCard>(null);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(null);
    const [{displayUnavailable}, setValue] = useSessionStorage("cards-settings", {
        displayUnavailable: null
    });
    const initActiveStorage = displayUnavailable !== null ? displayUnavailable : false;
    const [displayUnavailableCards, setDisplayUnavailableCards] = useState(initActiveStorage);
    
    const onClick = (event: MouseEvent<HTMLDivElement, any>) => {
        const item = event.currentTarget.getAttribute('data-item');
        
        setSelectedItem(item);
        confirmationModal.showModal();
    }
    
    const {
        bankCards,
        updateCard
    } = storeBankCards(state => state);
    
    useEffect(() => {
        if (bankCards && !card) {
            setCard(bankCards[0]);
        }
    }, [bankCards]);
    
    const toggleUnavailableCards = () => {
        setValue(() => ({displayUnavailable: !displayUnavailableCards}));
        setDisplayUnavailableCards((prev: boolean) => !prev);
    }
    
    return !card ? <Loader/> : (<>
        <BankCardsCarousel onSelect={setCard}/>
        
        <span className={`
                ${!bankCards.some(c => c.cardStatus === 'ACTIVE')
                ? 'pointer-events-none grayscale' : ''}
                flex align-middle mt-1 font-normal text-gray-400
            `}
        >
            <Checkbox
                onChange={toggleUnavailableCards}
                defaultChecked={displayUnavailableCards}
            /> Display unavailable cards
        </span>
        
        {card.cardStatus !== "PLASTIC_IN_WAY" && (
            <MenuItem
                leftPrimary='Activate card'
            />
        )}
        
        <MenuItem
            className='pointer-events-none'
            leftPrimary='Available funds'
            rightPrimary={`
                ${eurWallet.availableBalance ? eurWallet.availableBalance.toNumber() : '-'} EUR
            `}
        />
        
        <MenuItem
            data-item=''
            className='rounded-b-none'
            leftPrimary='Set day limits'
            leftSecondary='Available'
            rightPrimary={numberWithSpaces(1000) + ' EUR'}
            rightSecondary={numberWithSpaces(1000) + ' EUR'}
        />
        
        <MenuItem
            data-item=''
            className='rounded-b-none -mt-[11px]'
            leftPrimary='Set month limits'
            leftSecondary='Available'
            rightPrimary={numberWithSpaces(1000) + ' EUR'}
            rightSecondary={numberWithSpaces(1000) + ' EUR'}
        />
        
        <MenuItem
            data-item=''
            leftPrimary='Disable limits temporarily'
            rightPrimary={<Switch checked={switchChecked}/>}
            onClick={() => setSwitchChecked(!switchChecked)}
        />
        
        <MenuItem
            data-item=''
            leftPrimary='Show card data'
        />
        
        {card.cardStatus === "ACTIVE" && (
            <MenuItem
                alert
                dataItem='blockCard'
                leftPrimary='Block card'
                onClick={() => {
                    apiUpdateCard(card.cardId, {status: 'LOCKED'})
                        .then(res => {
                            alert('card locked')
                        });
                }}
            />
        )}
        
        {card.cardStatus === "BLOCKED_BY_CUSTOMER" && (
            <MenuItem
                data-item=''
                leftPrimary='Unblock card'
                onClick={() => {
                    apiUpdateCard(card.cardId, {status: 'ACTIVE'})
                        .then(res => {
                            updateCard(res.data as IResCard)
                        });
                }}
            />
        )}
        
        <Modal
            open={confirmationModal.isModalOpen}
            onCancel={confirmationModal.handleCancel}
        >
            {selectedItem === "blockCard" && (
                <div>
                    <div>Are you sure you want to block selected bank card?</div>
                    
                    <Button
                        onClick={() => {
                            apiUpdateCard(card.cardId, {status: 'LOCKED'})
                                .then(confirmationModal.handleCancel);
                        }}
                    >Confirm</Button>
                </div>
            )}
        </Modal>
    </>);
}

export default CardsMenu;
