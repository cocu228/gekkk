import MenuItem from './item';
import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { useTranslation } from "react-i18next";
import { numberWithSpaces, randomId } from '@/shared/lib';
import { ICardStorage } from '../../model/types';
import { IconApp } from '@/shared/ui/icons/icon-app';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';
import { Card as ICardData } from "@/shared/(orval)api/gek/model/card";
import BankCardsCarousel from '@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel';
import Button from '@/shared/ui/button/Button';
import HowItWorks from './how-it-works';
import { CtxGlobalModalContext } from '@/app/providers/CtxGlobalModalProvider';
import ConfirmationModal from './confirmation-modal';
import CardInfo from './card-info';
import { Switch } from '@/shared/ui/Switch';

interface IParams {
    cardsStorage: ICardStorage;
    setIsNewCardOpened: (isOpen: boolean) => void;
    setCardsStorage: (cards: ICardStorage) => void;
}

const MenuForm = ({
    cardsStorage,
    setCardsStorage,
    setIsNewCardOpened
}: IParams) => {
    const { t } = useTranslation();
    const { md } = useBreakpoints();
    const [switchChecked, setSwitchChecked] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>(null);
    const [selectedCard, setSelectedCard] = useState<ICardData | null>(null);
    const {
        setContent: setGlobalModal,
        handleCancel: onGlobalCancel
    } = useContext(CtxGlobalModalContext);

    const onClick = ({currentTarget}) => {
        const item = currentTarget.getAttribute("data-item");

        setSelectedItem(item);
    };

    const updateCard = (card: ICardData) => {
        setCardsStorage({
            cards: [
                card,
                ...cardsStorage.cards.filter((c) => c.cardId !== card.cardId),
            ],
            refreshKey: randomId(),
        });
        
        setSelectedCard(card);
    };
    
    if (selectedItem === "showData") {
        return (<CardInfo
            cardId={selectedCard.cardId}
            onBack={() => setSelectedItem(null)}
        />);
    }

    if (selectedItem === "how-it-works") {
        return (<HowItWorks onBack={() => setSelectedItem(null)}/>);
    }

    return <>
        {/* Display header only in desktop mode */}
        {!md && (
            <div className={styles.Header}>
                <span className={styles.HeaderTitle}>{t("payment_cards")}</span>
                <span
                    className={styles.HeaderButton}
                    onClick={() => setIsNewCardOpened(true)}
                >
                    {t("issue_new_card")}
                </span>
            </div>
        )}

        <div className={styles.Carousel}>
            <BankCardsCarousel
                cards={cardsStorage.cards}
                refreshKey={cardsStorage.refreshKey}
                onSelect={(card) => {
                    setSelectedCard(card);
                    setSwitchChecked(card?.options?.limits?.disable);
                }}
            />
        </div>

        {selectedCard?.isVirtual && (
            <MenuItem
                onClick={onClick}
                dataItem="orderPlastic"
                leftPrimary={t("order_plastic_card")}
                rightPrimary={<IconApp code="t08" color="#888a92" size={12} />}
            />
        )}

        {selectedCard?.limits
            .sort((l) => (l.period === "MONTHLY" ? -1 : 1))
            .map((limit, index) => (
                <MenuItem
                    key={index}
                    onClick={onClick}
                    dataItem={limit.period.toLowerCase() + "Limit"}
                    progress={(limit.usedLimit / limit.currentLimit) * 100}
                    leftSecondary={t("available")}
                    leftPrimary={t("set_limit", {
                        period: t(limit.period.toLowerCase()),
                    }).capitalize()}
                    rightPrimary={numberWithSpaces(limit.currentLimit) + " EUR"}
                    rightSecondary={numberWithSpaces(limit.usedLimit) + " EUR"}
                />
        ))}

        <MenuItem
            onClick={onClick}
            dataItem="disableLimits"
            leftPrimary={t("disable_limits_for_minutes", { minutes: 3 })}
            rightPrimary={<Switch
                onChange={null} defaultCheked={switchChecked}
                className='pointer-events-none'
            />}
        />

        <MenuItem
            leftPrimary={t("show_card_data")}
            rightPrimary={<IconApp code="t08" color="#888a92" size={12} />}
            onClick={() => {
                if (md) {
                    setSelectedItem("showData");
                } else {
                    setGlobalModal({
                        title: "Card info",
                        content: <CardInfo
                            cardId={selectedCard.cardId}
                            onBack={onGlobalCancel}
                        />
                    });
                }
            }}
        />

        {/* Desktop: show modal with "How it works"*/}
        {/* Mobile: replace content with "How it works"*/}
        <a className={styles.LinkButton}
            onClick={(e) => {
                e.preventDefault();
                if (md) {
                    setSelectedItem("how-it-works");
                } else {
                    setGlobalModal({
                        title: "How it works",
                        content: <HowItWorks onBack={onGlobalCancel}/>
                    });
                }
            }}
        >
            {t("how_it_works")}
        </a>

        <div className={styles.FooterContainer}>
            <Button
                color='red'
                onClick={() => {
                    setSelectedItem(selectedCard?.cardStatus !== "LOCKED"
                        ? "blockCard"
                        : "unblockCard"
                    );
                }}
            >
                <IconApp code="t54" size={10} color="#fff" />
                <div>
                    {selectedCard?.cardStatus === "ACTIVE"
                        ? t("block_card")
                        : t("unblock_card")}
                </div>
            </Button>

            {/* Order new card displays in header on desktop */}
            {md && (
                <Button onClick={() => setIsNewCardOpened(true)}>
                  <div>{t("order_new_card")}</div>
                </Button>
            )}
        </div>

        <ConfirmationModal
            updateCard={updateCard}
            selectedCard={selectedCard}
            selectedItem={selectedItem}
            switchChecked={switchChecked}
            setSwitchChecked={setSwitchChecked}
            onCancel={() => setSelectedItem(null)}
        />
    </>
}

export default MenuForm;