import { Switch } from "antd";
import Loader from "@/shared/ui/loader";
import Form from "@/shared/ui/form/Form";
import Modal from "@/shared/ui/modal/Modal";
import MenuItem from "./menu-item/MenuItem";
import Button from "@/shared/ui/button/Button";
import useModal from "@/shared/model/hooks/useModal";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import { apiUpdateCard, IResCard } from "@/shared/api";
import { numberWithSpaces } from "@/shared/lib/helpers";
import { MouseEvent, useEffect, useState } from "react";
import { apiActivateCard } from "@/shared/api/bank/activate-card";
import { storeBankCards } from "@/shared/store/bank-cards/bankCards";
import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import BankCardsCarousel from "@/features/bank-cards-carousel/ui/BankCardsCarousel";
import { useTranslation } from 'react-i18next';

const CardsMenu = () => {
    const { t } = useTranslation();

    const confirmationModal = useModal();
    const [card, setCard] = useState<IResCard>(null);
    const [switchChecked, setSwitchChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(null);
    const [{ displayUnavailable }, setValue] = useSessionStorage("cards-settings", {
        displayUnavailable: null
    });
    const { inputCurr: limitAmount, setInputCurr: setLimitAmount } = useInputState();
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
                    .then(({ data }) => updateCard(data as IResCard));
                break;

            case 'blockCard':
                apiUpdateCard(card.cardId, {
                    status: "BLOCKED_BY_CUSTOMER"
                }).then(({ data }) => updateCard(data as IResCard));
                break;

            case 'unblockCard':
                apiUpdateCard(card.cardId, {
                    status: "ACTIVE"
                }).then(({ data }) => updateCard(data as IResCard));
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
        setValue(() => ({ displayUnavailable: !displayUnavailableCards }));
        setDisplayUnavailableCards((prev: boolean) => !prev);
    }

    return !card ? <Loader /> : (<>
        <div className="max-w-[220px]">
            <BankCardsCarousel onSelect={setCard} />
        </div>

        <span className={`
                ${!bankCards.some(c => c.cardStatus === 'ACTIVE')
                ? 'pointer-events-none grayscale' : ''}
                flex align-middle mt-1 font-normal text-gray-400 mb-4
            `}
        >
            <Checkbox
                onChange={toggleUnavailableCards}
                defaultChecked={displayUnavailableCards}
            /> {t("display_unavailable_cards")}
        </span>

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
            data-item=''
            leftPrimary={t("disable_limits")}
            rightPrimary={<Switch checked={switchChecked} />}
            onClick={() => setSwitchChecked(!switchChecked)}
        />

        <MenuItem
            data-item=''
            leftPrimary={t("show_card_data")}
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
        </Modal>
    </>);
}

export default CardsMenu;
