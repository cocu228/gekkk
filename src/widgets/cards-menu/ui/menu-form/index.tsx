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
import { CtxGlobalModalContext } from '@/app/providers/CtxGlobalModalProvider';
import ConfirmationModal from './confirmation-modal';
import CardInfo from './card-info';
import { Switch } from '@/shared/ui/Switch';
import { Link, useNavigate } from 'react-router-dom';

interface IParams {
    cardsStorage: ICardStorage;
    onSelectCard: (card: ICardData) => void;
    setIsNewCardOpened: (isOpen: boolean) => void;
    setCardsStorage: (cards: ICardStorage) => void;
}

const MenuForm = ({
    cardsStorage,
    onSelectCard,
    setCardsStorage,
    setIsNewCardOpened
}: IParams) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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

    return <div className='px-2'>
        {/* Display header only in desktop mode */}
        {!md && (
            <div className={styles.Header}>
                <span className={styles.HeaderTitle}>{t("payment_cards")}</span>
                <span
                    className={styles.HeaderButton}
                    onClick={() => {
                        onSelectCard(null);
                        setIsNewCardOpened(true);
                    }}
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
                    onSelectCard(card);
                    setSwitchChecked(card?.options?.limits?.disable);
                }}
            />
        </div>

        {selectedCard?.isVirtual && (
            <MenuItem
                onClick={() => setIsNewCardOpened(true)}
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
                    navigate({
                        pathname: '/card-menu',
                        search: 'card_info=true'
                    })
                    setSelectedItem("showData");
                } else {
                    setGlobalModal({
                        title: t("card_info"),
                        content: <CardInfo
                            cardId={selectedCard.cardId}
                            onBack={onGlobalCancel}
                        />
                    });
                }
            }}
        />

        {selectedCard?.cardStatus !== 'LOCKED' ? null : (
            <MenuItem
                leftPrimary={t("unblock_card")}
                rightPrimary={<IconApp code="t08" color="#888a92" size={12} />}
                onClick={() => {
                    setSelectedItem("unblockCard");
                }}
            />
        )}

        {/* Desktop: show modal with "How it works"*/}
        {/* Mobile: replace content with "How it works"*/}
        <Link className={styles.LinkButton}
            to={'/faq?faqSection=card_limits'}
        >
            {t("how_it_works")}?
        </Link>

        <div className={styles.FooterContainer}>
            {selectedCard?.cardStatus !== 'ACTIVE' ? null : (
                <Button
                    className={"min-w-[120px] p-[15px_7px]"}
                    color='red'
                    onClick={() => {
                        setSelectedItem(selectedCard?.cardStatus !== "LOCKED"
                            ? "blockCard"
                            : "unblockCard"
                        );
                    }}
                >
                    <IconApp code="t37" size={10} className={"min-w-[10px]"} color="#fff" />
                    <p className={"whitespace-nowrap"}>
                        {selectedCard?.cardStatus === "ACTIVE"
                            ? t("block_card")
                            : t("unblock_card")}
                    </p>
                </Button>
            )}

            {/* Order new card displays in header on desktop */}
            {md && (
                <Button
                  className={"min-w-[120px] p-[15px_7px]"}
                  onClick={() => {
                    onSelectCard(null);
                    setIsNewCardOpened(true);
                }}
                >
                  <p className={"whitespace-nowrap"}>{t("order_new_card")}</p>
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
    </div>
}

export default MenuForm;
