import { Switch } from "antd";
import {NewCard} from "./new-card";
import styles from './style.module.scss'
import Loader from "@/shared/ui/loader";
import Form from "@/shared/ui/form/Form";
import Modal from "@/shared/ui/modal/Modal";
import MenuItem from "./menu-item/MenuItem";
import {useTranslation} from 'react-i18next';
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import {apiUpdateCard, IResCard, IResErrors} from "@/shared/api";
import {numberWithSpaces} from "@/shared/lib/helpers";
import {MouseEvent, useState} from "react";
import {apiActivateCard} from "@/shared/api/bank/activate-card";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";
import {useInputState} from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import BankCardsCarousel from "@/features/bank-cards-carousel/ui/BankCardsCarousel";
import useLocalStorage from "@/shared/model/hooks/useLocalStorage";
import {apiUnmaskCard, IUnmaskedCardData} from "@/shared/api/bank/unmask-card";
import {formatCardNumber, formatMonthYear} from "@/widgets/dashboard/model/helpers";

// todo: refactoring
const CardsMenu = () => {
    const {t} = useTranslation();
    const cardInfoModal = useModal();
    const confirmationModal = useModal();
    const [card, setCard] = useState<IResCard>(null);
    const {updateCard} = storeBankCards(state => state);
    const [loading, setLoading] = useState<boolean>(false);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(null);
    const [cardInfo, setCardInfo] = useState<IUnmaskedCardData>(null);
    const [{ displayUnavailable }, setValue] = useLocalStorage("cards-settings", {
        displayUnavailable: null
    });
    const { inputCurr: limitAmount, setInputCurr: setLimitAmount } = useInputState();
    const initActiveStorage = displayUnavailable !== null ? displayUnavailable : false;
    const [displayUnavailableCards, setDisplayUnavailableCards] = useState(initActiveStorage);
    
    const onClick = (event: MouseEvent<HTMLDivElement, any>) => {
        const item = event.currentTarget.getAttribute('data-item');
        
        setLoading(false);
        setSelectedItem(item);
        confirmationModal.showModal();
    }
    
    const onConfirm = async (action: string) => {
        setLoading(true);
        
        switch (action) {
            case 'activate':
                apiActivateCard(card.cardId)
                    .then(({ data }) => {
                        if ((data as IResErrors).errors) {
                            confirmationModal.handleCancel();
                            return;
                        }
                        
                        updateCard({
                            ...card,
                            cardStatus: "ACTIVE"
                        });
                        
                        setLoading(false);
                        confirmationModal.handleCancel();
                    });
                break;
            
            case 'blockCard':
                apiUpdateCard(card.cardId, {
                    status: "LOCKED"
                }).then(({ data }) => {
                    if ((data as IResErrors).errors) {
                        confirmationModal.handleCancel();
                        return;
                    }
                    
                    updateCard({
                        ...card,
                        cardStatus: "BLOCKED_BY_CUSTOMER"
                    });
                    
                    setLoading(false);
                    confirmationModal.handleCancel();
                });
                break;
            
            case 'unblockCard':
                apiUpdateCard(card.cardId, {
                    status: "ACTIVE"
                }).then(({ data }) => {
                    if ((data as IResErrors).errors) {
                        confirmationModal.handleCancel();
                        return;
                    }
                    
                    updateCard({
                        ...card,
                        cardStatus: "ACTIVE"
                    });
                    
                    setLoading(false);
                    confirmationModal.handleCancel();
                });
                break;
            
            case 'dailyLimit':
            case 'monthlyLimit':
                apiUpdateCard(card.cardId, {
                    limits: [{
                        type: action === 'dailyLimit' ? 'DAY' : 'MONTH',
                        maxValue: limitAmount.value.number
                    }]
                }).then(({data}) => {
                    if ((data as IResErrors).errors) {
                        confirmationModal.handleCancel();
                        return;
                    }
                    
                    updateCard({
                        ...card,
                        limits: [
                            ...card.limits.filter(l => l.period !== (action === 'dailyLimit' ? 'DAILY' : 'MONTHLY')),
                            {
                                type: "ALL",
                                period: action === 'dailyLimit' ? 'DAILY' : 'MONTHLY',
                                usedLimit: 0,
                                currentLimit: limitAmount.value.number,
                                maxLimit: 100000
                            }
                        ]
                    });
                    
                    setLimitAmount('');
                    setLoading(false);
                    confirmationModal.handleCancel();
                })
                break;
                
            case 'disableLimits':
                apiUpdateCard(card.cardId, {
                    options: {
                        limits: {
                            disable: true
                        }
                    }
                }).then(({data}) => {
                    if ((data as IResErrors).errors) {
                        confirmationModal.handleCancel();
                        return;
                    }
                    
                    setSwitchChecked(!switchChecked);
                    setLoading(false);
                    confirmationModal.handleCancel();
                });
                break;
                
            case 'showData':
                apiUnmaskCard(card.cardId)
                    .then(({data}) => {
                        if ((data as IResErrors).errors) {
                            confirmationModal.handleCancel();
                            return;
                        }
                        
                        setCardInfo(data as IUnmaskedCardData);
                        confirmationModal.handleCancel();
                        cardInfoModal.showModal();
                    });
                break;
                
            default:
                break;
        }
    }
    
    const toggleUnavailableCards = () => {
        setValue({ displayUnavailable: !displayUnavailableCards });
        setDisplayUnavailableCards((prev: boolean) => !prev);
    }
    
    return <div>
        <div className={styles.CarouselBlock}>
            <div className={styles.CarouselBlockContainer}>
                <BankCardsCarousel displayUnavailable={displayUnavailableCards} onSelect={setCard} />
            </div>
        </div>
        
        <span className='flex align-middle mt-1 font-normal text-gray-400 mb-4'>
            <Checkbox
                onChange={toggleUnavailableCards}
                defaultChecked={displayUnavailableCards}
            /> {t("display_unavailable_cards")}
        </span>
        
        {!card ? null : card.cardId === 'new' ? (
            <NewCard/>
        ) : (<>
            {card.cardStatus === "PLASTIC_IN_WAY" && (
                <MenuItem
                    onClick={onClick}
                    dataItem='activate'
                    leftPrimary={t("activate_card")}
                />
            )}
            
            {card.limits
                .sort(l => l.period === 'MONTHLY' ? -1 : 1)
                .map((limit, index) =>
                    <MenuItem
                        onClick={onClick}
                        dataItem={limit.period.toLowerCase() + "Limit"}
                        leftSecondary={t("available")}
                        leftPrimary={t("set_limit", { period: limit.period.toLowerCase() })}
                        rightSecondary={numberWithSpaces(limit.usedLimit) + ' EUR'}
                        rightPrimary={numberWithSpaces(limit.currentLimit) + ' EUR'}
                        className={`rounded-none -my-[1px]
                    ${index !== 0 ? '' : 'rounded-t-[5px]'}
                    ${index !== (card.limits.length - 1) ? '' : 'rounded-b-[5px]'}
                `}
                    />
                )}
            
            <MenuItem
                dataItem='disableLimits'
                leftPrimary={t("disable_limits")}
                rightPrimary={<Switch checked={switchChecked} />}
                onClick={onClick}
            />
            
            <MenuItem
                dataItem='showData'
                leftPrimary={t("show_card_data")}
                onClick={onClick}
            />
            
            {(card.cardStatus === 'BLOCKED_BY_CUSTOMER' || card.cardStatus === 'ACTIVE') && (
                <MenuItem
                    alert
                    onClick={onClick}
                    dataItem={card.cardStatus === 'ACTIVE' ? 'blockCard' : 'unblockCard'}
                    leftPrimary={card.cardStatus === 'ACTIVE' ? t("block_card") : t("unblock_card")}
                />
            )}
            
            <Modal
                title={t("confirm_action")}
                open={confirmationModal.isModalOpen}
                onCancel={confirmationModal.handleCancel}
            >
                {loading ? <Loader/> : <div>
                    {selectedItem === "blockCard" && (
                        <div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("block_selected_bank_card")}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {selectedItem === "unblockCard" && (
                        <div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("unblock_selected_bank_card")}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {selectedItem === 'activate' && (
                        <div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("for_security_reasons")}
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("virtual_card_data_for_online")}
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("using_your_physical_card")}
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col font-bold">
                                    {t("activate_your_card")}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {(selectedItem === 'dailyLimit' || selectedItem === 'monthlyLimit') && (
                        <div>
                            <div className="row mb-2">
                                <div className="col">
                                    <span className="font-medium">{t("limit_amount")}</span>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col">
                                    <InputCurrency
                                        onChange={setLimitAmount}
                                        value={limitAmount.value.string}
                                        currency={'EUR'} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {(selectedItem === 'disableLimits') && (
                        <div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("disable_limits")}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {(selectedItem === 'showData') && (
                        <div>
                            <div className="row mb-5">
                                <div className="col">
                                    {t("show_card_data")}
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
                                >{t("confirm")}</Button>
                            </div>
                        </div>
                    </Form>
                </div>}
            </Modal>
            
            <Modal
                title={t("card_info")}
                open={cardInfoModal.isModalOpen}
                onCancel={cardInfoModal.handleCancel}
            >
                {!cardInfo ? null : <div className='font-medium text-[16px]'>
                    <div className="row mb-2">
                        <div className="col">
                            <span><b>{t("card_number")
                                .toLowerCase()
                                .capitalize()
                            }</b>: {formatCardNumber(cardInfo.number)}</span>
                        </div>
                    </div>
                    
                    <div className="row mb-2">
                        <div className="col">
                            <span><b>{t("expiration_date")
                                }</b>: {formatMonthYear(new Date(cardInfo.expireAt))}
                            </span>
                        </div>
                    </div>
                    
                    <div className="row mb-2">
                        <div className="col">
                            <span><b>{t("card_cvc")}</b>: {cardInfo.cvc}</span>
                        </div>
                    </div>
                    
                    <div className="row mb-2">
                        <div className="col">
                            <span><b>{t("card_owner")}</b>: {cardInfo.owner.embossedName}</span>
                        </div>
                    </div>
                    
                    <div className="row mb-2">
                        <div className="col">
                            <span><b>{t("card_pin")}</b>: {cardInfo.pin}</span>
                        </div>
                    </div>
                </div>}
                
                <Form onFinish={cardInfoModal.handleCancel}>
                    <div className="row my-5">
                        <div className="col">
                            <Button size={"xl"}
                                    htmlType={"submit"}
                                    className="w-full"
                            >{t("close")}</Button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>)}
    </div>
}

export default CardsMenu;
