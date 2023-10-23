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
import Form from "@/shared/ui/form/Form";
import {apiActivateCard} from "@/shared/api/bank/activate-card";

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
    
    const onConfirm = (action: string) => {
        confirmationModal.handleCancel();
        
        switch (action) {
            case 'activate':
                apiActivateCard(card.cardId)
                    .then(({data}) => updateCard(data as IResCard));
                break;

            case 'blockCard':
                apiUpdateCard(card.cardId, {
                    status: "LOCKED"
                }).then(({data}) => updateCard(data as IResCard));
                break;
                
            case 'unblockCard':
                apiUpdateCard(card.cardId, {
                    status: "ACTIVE"
                }).then(({data}) => updateCard(data as IResCard));
                break;
                
            case 'dailyLimit':
                break;
                
            case 'monthlyLimit':
                break;
        }
    }
    
    const {
        bankCards,
        refreshKey,
        updateCard
    } = storeBankCards(state => state);
    
    useEffect(() => {
        if (bankCards) {
            setCard(bankCards[0]);
        }
    }, [bankCards, refreshKey]);
    
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
        
        {card.cardStatus === "PLASTIC_IN_WAY" && (
            <MenuItem
                onClick={onClick}
                dataItem='activate'
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
        
        {card.limits.map((limit, index) =>
            <MenuItem
                dataItem={limit.period.toLowerCase() + 'Limit'}
                leftSecondary='Available'
                leftPrimary={`Set ${limit.period.toLowerCase()} limit`}
                rightSecondary={numberWithSpaces(limit.usedLimit) + ' EUR'}
                rightPrimary={numberWithSpaces(limit.currentLimit) + ' EUR'}
                className={`rounded-none -my-[1px]
                    ${index !== 0 ? '' : 'rounded-t-[5px]'}
                    ${index !== (card.limits.length - 1) ? '' : 'rounded-b-[5px]'}
                `}
            />
        )}
        
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
        
        <MenuItem
            alert
            onClick={onClick}
            dataItem={card.cardStatus === 'ACTIVE' ? 'blockCard' : 'unblockCard'}
            leftPrimary={card.cardStatus === 'ACTIVE' ? 'Block card' : 'Unblock card'}
        />
        
        <Modal
            title='Confirm action'
            open={confirmationModal.isModalOpen}
            onCancel={confirmationModal.handleCancel}
        >
            {selectedItem === "blockCard" && (
                <div>
                    <div className="row mb-5">
                        <div className="col">
                            Are you sure you want to block selected bank card?
                        </div>
                    </div>
                </div>
            )}
            
            {selectedItem === "unblockCard" && (
                <div>
                    <div className="row mb-5">
                        <div className="col">
                            Are you sure you want to unblock selected bank card?
                        </div>
                    </div>
                </div>
            )}
            
            {selectedItem === 'activate' && (
                <div>
                    <div className="row mb-5">
                        <div className="col">
                            For security reasons your physical card was sent deactivated and could not be used without activation.
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            You can still use your virtual card data for online shopping in internet. Each transaction is protected by 3D secure with one time code sent you in SMS.
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            To start using your physical card you should activate it upon delivery. To do that, just press button below. We will send you a one time activation code.
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col font-bold">
                            Please, activate your card only if the number embossed on your physical card is identical to your virtual card!
                        </div>
                    </div>
                </div>
            )}
            
            <Form onFinish={() => onConfirm(selectedItem)}>
                <div className="row my-5">
                    <div className="col">
                        <Button size={"xl"}
                                htmlType={"submit"}
                                className="w-full"
                        >Confirm</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    </>);
}

export default CardsMenu;
