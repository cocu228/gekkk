import axios from "axios";
import { Switch } from "antd";
import { NewCard } from "./new-card";
import Loader from "@/shared/ui/loader";
import Form from "@/shared/ui/form/Form";
import styles from "./style.module.scss";
import { MouseEvent, useEffect, useState } from "react";
import Modal from "@/shared/ui/modal/Modal";
import MenuItem from "./menu-item/MenuItem";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/!button/Button";
import useModal from "@/shared/model/hooks/useModal";
import { numberWithSpaces, randomId } from "@/shared/lib/helpers";
import {
  apiActivate,
  apiUnmask,
  apiGetCards,
  apiSetLimits,
} from "@/shared/(orval)api/gek";
import {
  ClientDetails,
  Card as ICardData,
  Period,
  type CardSecretDTO,
} from "@/shared/(orval)api/gek/model";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import InputCurrency from "@/shared/ui/input-currency/ui/input-field/InputField";
import BankCardsCarousel from "@/shared/ui/bank-cards-carousel/ui/BankCardsCarousel";
import { formatMonthYear } from "@/widgets/dashboard/model/helpers";
import { useSearchParams } from "react-router-dom";
import { OrderCard } from "@/widgets/cards-menu/ui/order-card";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

// todo: refactoring
const CardsMenu = ({
  isNewCardOpened,
  setIsNewCardOpened
}: {
  isNewCardOpened: boolean;
  setIsNewCardOpened: (isOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const cardInfoModal = useModal();
  const [params] = useSearchParams();
  const newCardUrl = params.has("new");
  const confirmationModal = useModal();
  const [card, setCard] = useState<ICardData>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [cardInfo, setCardInfo] = useState<CardSecretDTO>(null);
  const [selectedItem, setSelectedItem] = useState<string>(null);
  const { getAccountDetails } = storeAccountDetails((state) => state);
  const [isOrderOpened, setIsOrderOpened] = useState<boolean>(false);
  const [accountDetails, setAccountDetails] = useState<ClientDetails>(null);
  const { inputCurr: limitAmount, setInputCurr: setLimitAmount } =
    useInputState();
  const [cardsStorage, setCardsStorage] = useState<{
    cards: ICardData[];
    refreshKey: string;
  }>({
    cards: null,
    refreshKey: null,
  });

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      const { data } = await apiGetCards(null, {
        cancelToken: cancelTokenSource.token
      });
      setAccountDetails(await getAccountDetails());
      
      setCardsStorage({
        cards: data.result,
        refreshKey: randomId(),
      });
    })();

    return () => {cancelTokenSource.cancel();};
  }, []);

  const updateCard = (card: ICardData) => {
    setCardsStorage({
      cards: [
        card,
        ...cardsStorage.cards.filter((c) => c.cardId !== card.cardId),
      ],
      refreshKey: randomId(),
    });
    setCard(card);
  };

  const onClick = (event: MouseEvent<HTMLDivElement, any>) => {
    const item = event.currentTarget.getAttribute("data-item");
    console.log(item);

    if (item === "orderPlastic") {
      setIsOrderOpened(true);
      return;
    }

    if (item === "showData") {
      onConfirm(item);
      cardInfoModal.showModal();
      return;
    }

    setLoading(false);
    setSelectedItem(item);
    confirmationModal.showModal();
  };

  const onConfirm = async (action: string) => {
    setLoading(true);

    switch (action) {
      case "activate":
        apiActivate({ cardId: card.cardId }).then(({ data }) => {
          if (data.result === "Failure") {
            confirmationModal.handleCancel();
            return;
          }

          updateCard({
            ...card,
            cardStatus: "ACTIVE",
          });

          setLoading(false);
          confirmationModal.handleCancel();
        });
        break;

      case "blockCard":
        apiSetLimits(
          {
            status: "LOCKED",
            limits: [],
          },
          { cardId: card.cardId }
        ).then(({ data }) => {
          if (data.result === "Failure") {
            confirmationModal.handleCancel();
            return;
          }

          updateCard({
            ...card,
            cardStatus: "BLOCKED_BY_CUSTOMER",
          });

          setLoading(false);
          confirmationModal.handleCancel();
        });
        break;

      case "unblockCard":
        apiSetLimits(
          {
            status: "ACTIVE",
            limits: [],
          },
          { cardId: card.cardId }
        ).then(({ data }) => {
          if (data.result === "Failure") {
            confirmationModal.handleCancel();
            return;
          }

          updateCard({
            ...card,
            cardStatus: "ACTIVE",
          });

          setLoading(false);
          confirmationModal.handleCancel();
        });
        break;

      case "dailyLimit":
      case "monthlyLimit":
        apiSetLimits(
          {
            limits: [
              {
                type: action === "dailyLimit" ? Period.DAILY : Period.MONTHLY,
                maxValue: limitAmount.value.number,
              },
            ],
          },
          { cardId: card.cardId }
        ).then(({ data }) => {
          if (data.result === "Failure") {
            confirmationModal.handleCancel();
            return;
          }

          updateCard({
            ...card,
            limits: [
              ...card.limits.filter(
                (l) =>
                  l.period !== (action === "dailyLimit" ? "DAILY" : "MONTHLY")
              ),
              {
                type: "ALL",
                period: action === "dailyLimit" ? "DAILY" : "MONTHLY",
                usedLimit: 0,
                currentLimit: limitAmount.value.number,
                maxLimit: 100000,
              },
            ],
          });

          setLimitAmount("");
          setLoading(false);
          confirmationModal.handleCancel();
        });
        break;

      case "disableLimits":
        apiSetLimits(
          {
            limits: [],
            options: {
              limits: {
                disable: !switchChecked,
              },
            },
          },
          { cardId: card.cardId }
        ).then(({ data }) => {
          if (data.result === "Failure") {
            confirmationModal.handleCancel();
            return;
          }

          setSwitchChecked(!switchChecked);
          setLimitAmount("");
          setLoading(false);
          confirmationModal.handleCancel();
        });
        break;

      case "showData":
        apiUnmask({ cardId: card.cardId }).then(({ data }) => {
          if (data.result.pan === null) {
            confirmationModal.handleCancel();
            return;
          }

          setCardInfo(data.result);
          confirmationModal.handleCancel();
        });
        break;

      default:
        break;
    }
  };

  if (
    isNewCardOpened ||
    newCardUrl ||
    (cardsStorage.cards && cardsStorage.cards.length === 0)
  ) {
    return !accountDetails ? (
      <Loader />
    ) : (
      <NewCard
        accountDetails={accountDetails}
        setIsNewCardOpened={setIsNewCardOpened}
      />
    );
  }

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-2">
        <span className="font-medium text-lg">{t("cards_menu")}</span>
        <span
          onClick={() => setIsNewCardOpened(true)}
          className="underline text-gray-400 hover:cursor-pointer hover:text-gray-600"
        >
          {t("issue_new_card")}
        </span>
      </div>

      <div className={styles.CarouselBlock}>
        <BankCardsCarousel
          cards={cardsStorage.cards}
          refreshKey={cardsStorage.refreshKey}
          onSelect={(card) => {
            setCard(card);
            setSwitchChecked(card?.options?.limits?.disable);
          }}
        />
      </div>

      {!card ? (
        <Loader className={"relative my-20"} />
      ) : isOrderOpened ? (
        !accountDetails ? (
          <Loader />
        ) : (
          <OrderCard
            accountDetails={accountDetails}
            card={card}
            setIsNewCardOpened={setIsOrderOpened}
          />
        )
      ) : (
        <>
          {card.isVirtual && (
            <MenuItem
              onClick={onClick}
              dataItem="orderPlastic"
              leftPrimary={t("order_plastic_card")}
            />
          )}

          {card.cardStatus === "PLASTIC_IN_WAY" && (
            <MenuItem
              onClick={onClick}
              dataItem="activate"
              leftPrimary={t("activate_card")}
            />
          )}

          {card.limits
            .sort((l) => (l.period === "MONTHLY" ? -1 : 1))
            .map((limit, index) => (
              <MenuItem
                onClick={onClick}
                dataItem={limit.period.toLowerCase() + "Limit"}
                leftSecondary={t("available")}
                leftPrimary={t("set_limit", {
                  period: t(limit.period.toLowerCase()),
                })}
                rightSecondary={numberWithSpaces(limit.usedLimit) + " EUR"}
                rightPrimary={numberWithSpaces(limit.currentLimit) + " EUR"}
                className={`rounded-none -my-[1px]
                    ${index !== 0 ? "" : "rounded-t-[5px]"}
                    ${index !== card.limits.length - 1 ? "" : "rounded-b-[5px]"}
                `}
              />
            ))}

          <MenuItem
            dataItem="disableLimits"
            leftPrimary={t("disable_limits")}
            rightPrimary={<Switch checked={switchChecked} />}
            onClick={onClick}
          />

          <MenuItem
            dataItem="showData"
            leftPrimary={t("show_card_data")}
            onClick={onClick}
          />

          {(card.cardStatus === "BLOCKED_BY_CUSTOMER" ||
            card.cardStatus === "ACTIVE") && (
            <MenuItem
              alert
              onClick={onClick}
              dataItem={
                card.cardStatus === "ACTIVE" ? "blockCard" : "unblockCard"
              }
              leftPrimary={
                card.cardStatus === "ACTIVE"
                  ? t("block_card")
                  : t("unblock_card")
              }
            />
          )}

          <Modal
            closable={false}
            title={<ModalTitle handleCancel={confirmationModal.handleCancel} title={t("confirm_action")}/>}
            open={confirmationModal.isModalOpen}
            onCancel={confirmationModal.handleCancel}
          >
            {loading ? (
              <Loader />
            ) : (
              <div>
                {selectedItem === "blockCard" && (
                  <div>
                    <div className="row mb-5">
                      <div className="col">{t("block_selected_bank_card")}</div>
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

                {selectedItem === "activate" && (
                  <div>
                    <div className="row mb-5">
                      <div className="col">{t("for_security_reasons")}</div>
                    </div>
                    <div className="row mb-5">
                      <div className="col">
                        {t("virtual_card_data_for_online")}
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col">{t("using_your_physical_card")}</div>
                    </div>
                    <div className="row mb-5">
                      <div className="col font-bold">
                        {t("activate_your_card")}
                      </div>
                    </div>
                  </div>
                )}

                {(selectedItem === "dailyLimit" ||
                  selectedItem === "monthlyLimit") && (
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
                          currency={"EUR"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem === "disableLimits" && (
                  <div>
                    <div className="row mb-5">
                      <div className="col">{t("disable_limits")}</div>
                    </div>
                  </div>
                )}

                {selectedItem === "showData" && (
                  <div>
                    <div className="row mb-5">
                      <div className="col">{t("show_card_data")}</div>
                    </div>
                  </div>
                )}

                <Form onFinish={() => onConfirm(selectedItem)}>
                  <div className="row my-5">
                    <div className="flex justify-center col">
                      <Button
                        size="lg"
                        htmlType={"submit"}
                        className="w-full"
                      >
                        {t("confirm")}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Modal>

          <Modal
            title={<ModalTitle handleCancel={cardInfoModal.handleCancel} title={t("card_info")}/>}
            closable={false}
            open={cardInfoModal.isModalOpen}
            onCancel={() => {
              cardInfoModal.handleCancel();
              setCardInfo(null);
            }}
          >
            {!cardInfo ? (
              <Loader className="relative my-10" />
            ) : (
              <div className="font-medium text-[16px] select-text">
                <div className="row mb-2">
                  <div className="col">
                    <span>
                      <b>{t("card_number").toLowerCase().capitalize()}</b>: ****
                      **{cardInfo.pan.slice(0, 2) + " " + cardInfo.pan.slice(2)}{" "}
                      ****
                    </span>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col">
                    <span>
                      <b>{t("expiration_date")}</b>:{" "}
                      {formatMonthYear(new Date(cardInfo.expireAt))}
                    </span>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col">
                    <span>
                      <b>{t("card_cvc")}</b>: {cardInfo.cvv ?? "-"}
                    </span>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col">
                    <span>
                      <b>{t("card_owner")}</b>: {cardInfo.owner ?? "-"}
                    </span>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col">
                    <span>
                      <b>{t("card_pin")}</b>: {cardInfo.pin ?? "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Form
              onFinish={() => {
                cardInfoModal.handleCancel();
                setCardInfo(null);
              }}
            >
              <div className="row my-5">
                <div className="flex justify-center col">
                  <Button size="lg" htmlType={"submit"} className="w-full">
                    {t("close")}
                  </Button>
                </div>
              </div>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CardsMenu;
