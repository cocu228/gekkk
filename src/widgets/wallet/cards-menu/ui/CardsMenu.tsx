import {Switch} from "antd";
import Loader from "@/shared/ui/loader";
import Form from "@/shared/ui/form/Form";
import Modal from "@/shared/ui/modal/Modal";
import MenuItem from "./menu-item/MenuItem";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {apiUpdateCard, IResCard} from "@/shared/api";
import {numberWithSpaces} from "@/shared/lib/helpers";
import {MouseEvent, useEffect, useState} from "react";
import {apiActivateCard} from "@/shared/api/bank/activate-card";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import BankCardsCarousel from "@/features/bank-cards-carousel/ui/BankCardsCarousel";

const CardsMenu = () => {
    const confirmationModal = useModal();
    const [card, setCard] = useState<IResCard>(null);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(null);
    const [{displayUnavailable}, setValue] = useSessionStorage("cards-settings", {
        displayUnavailable: null
    });
    const {inputCurr: limitAmount, setInputCurr: setLimitAmount} = useInputState();
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
            case 'monthlyLimit':
                apiUpdateCard(card.cardId, {
                    limits: [{
                        type: action === 'dailyLimit' ? 'DAY' : 'MONTH',
                        maxValue: limitAmount.value.number
                    }]
                })
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
            //setSwitchChecked(bankCards[)
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
                flex align-middle mt-1 font-normal text-gray-400 mb-4
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
        
        {card.limits
            .sort(l => l.period === 'MONTHLY' ? -1 : 1)
            .map((limit, index) =>
            <MenuItem
                onClick={onClick}
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
        
        {(card.cardStatus === 'LOCKED' || card.cardStatus === 'ACTIVE') && (
            <MenuItem
                alert
                onClick={onClick}
                dataItem={card.cardStatus === 'ACTIVE' ? 'blockCard' : 'unblockCard'}
                leftPrimary={card.cardStatus === 'ACTIVE' ? 'Block card' : 'Unblock card'}
            />
        )}
        
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
            
            {(selectedItem === 'dailyLimit' || selectedItem === 'monthlyLimit') && (
                <div>
                    <div className="row mb-2">
                        <div className="col">
                            <span className="font-medium">Limit amount</span>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <InputCurrency
                                onChange={setLimitAmount}
                                value={limitAmount.value.string}
                                currency={'EUR'}/>
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
