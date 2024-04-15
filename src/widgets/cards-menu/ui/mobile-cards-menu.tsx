import { Switch } from "antd";
import { NewCard } from "./new-card";
import Loader from "@/shared/ui/loader";
import Form from "@/shared/ui/form/Form";
import styles from "./style.module.scss";
import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "@/shared/ui/modal/Modal";
import MenuItem from "./menu-item/MenuItem";
import { useTranslation } from "react-i18next";
import Button from "@/shared/ui/button/Button";
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
import { MobileMenuItem } from "./menu-item/mobile-menu-item";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import Arrow from "@/assets/arrow.svg?react";
import Lock from "@/assets/lock.svg?react";
import Warning from "@/assets/warning.svg?react";
import Warn from "@/assets/warnn.svg?react";
import { MobileButton } from "@/shared/ui/mobile-button/mobile-button";
import { MenuButton } from "./menu-button/menu-button";
import MobileModal from "@/shared/ui/modal/MobileModal";
import { Typography } from "@/shared/ui/typography/typography";
import { Outlet } from "react-router-dom";
import { useCardStore } from "../model/currentCardStore";

// todo: refactoring
const MobileCardsMenu = ({
  isNewCardOpened,
  setIsNewCardOpened,
  isMobile,
}: {
  isNewCardOpened: boolean;
  setIsNewCardOpened: (isOpen: boolean) => void;
  isMobile?: boolean;
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

  const setCurrentCard = useCardStore((state) => state.setCard);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiGetCards();
        setAccountDetails(await getAccountDetails());

        setCardsStorage({
          cards: data.result,
          refreshKey: randomId(),
        });
      } catch (err: unknown) {
        console.log(err);
      }
    })();
  }, []);

  const updateCard = (card: ICardData) => {
    setCardsStorage({
      cards: [
        card,
        ...cardsStorage.cards.filter((c) => c.cardId !== card.cardId),
      ],
      refreshKey: randomId(),
    });
    setCurrentCard(card);
    setCard(card);
  };

  const onClick = (event: MouseEvent<HTMLDivElement, any>) => {
    const item = event.currentTarget.getAttribute("data-item");

    if (item === "orderPlastic") {
      setIsOrderOpened(true);
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
  useEffect(() => {
    try {
      apiUnmask({ cardId: card.cardId }).then(({ data }) => {
        if (data.result.pan === null) {
          confirmationModal.handleCancel();
          return;
        }

        setCardInfo(data.result);
        confirmationModal.handleCancel();
      });
    } catch (err: unknown) {}
  }, [card]);

  if (
    isNewCardOpened ||
    newCardUrl ||
    (cardsStorage.cards && cardsStorage.cards.length === 0)
  ) {
    return !accountDetails ? (
      <Loader />
    ) : (
      <NewCard
        isMobile
        accountDetails={accountDetails}
        setIsNewCardOpened={setIsNewCardOpened}
      />
    );
  }
  console.log(selectedItem);

  if (selectedItem == "how-it-works") {
    return (
      <div className="flex items-center justify-center">
        <div className="substrate w-full rounded-xl">
          <p className={`typography-b1 ${styles.howText}`}>
            The function of setting / disabling limits allows you to create
            limits yourself, which regulate your expenses on your card. Limits
            apply to the following card transactions:
            <br />
            -Cash withdrawal from the card
            <br />
            -Payment of purchases on the card
            <br />
            Day limit
            <br />
            It is possible to indicate the maximum amount of transactions within
            one day. For example, if you specify a daily limit of 1000 EUR, you
            will not be able to carry out transactions (cash withdrawals and
            purchases) of more than 1000 EUR in one day. In «Available» field
            you can see the amount available for use before reaching the limit.
            If some amount is held when making a cash withdrawal or purchase,
            then the Available value is also reduced by this amount. If the
            daily limit is reached, you will not be able to pay for the purchase
            or withdraw cash from the card.
            <br />
            Month Limit
            <br />
            Here it is possible to indicate the amount of expenses within one
            month from the moment the limit is set, for example, 10 000 EUR. In
            the case of such a setting, it will not be possible to carry out
            transactions (cash withdrawals and purchases) by more than 10,000
            EUR per month. If specified Daily Limit is more than specified
            Monthly limit, the value of the Monthly Limit is automatically
            increased to the value of the Daily Limit. In «Available» field you
            can see the amount available for use before reaching the limit. If
            some amount is held when making a cash withdrawal or purchase, then
            the Available value is also reduced by this amount. If the Monthly
            limit is reached, you will not be able to pay for the purchase or
            withdraw cash from the card.
            <br />
            Temporarily disable limits
            <br />
            To temporarily deactivate Daily and Monthly limits you should turn
            the "Disable Limits Temporarily” switch to the ON position. You can
            only deactivate limits until the first cash withdrawal or purchase
            transaction, or until 3 minutes have passed since the deactivation.
            After that the "Disable Limits Temporarily” switch automatically
            returns to the OFF position. Next to the switch "Disable Limits
            Temporarily”, the timeout counter is displayed.
          </p>
          <div className="mt-5 h-[50px] flex items-center justify-center">
            <MobileButton
              className="w-[115px]"
              onClick={() => setSelectedItem("")}
            >
              {t("back")}
            </MobileButton>
          </div>
        </div>
      </div>
    );
  }

  if (selectedItem === "showData") {
    return (
      <div className="mt-10 flex flex-column justify-center w-full">
        <div className="substrate flex rounded-lg w-full">
          {!cardInfo ? (
            <Loader className="relative my-10" />
          ) : (
            <div className="font-medium text-[16px]">
              <div className="flex flex-row gap-2">
                <Warn className="w-10" />
                <h3 className="typogrhaphy-b1 text-[12px]" color="dark-green">
                  {t("be_careful")}
                </h3>
              </div>

              <div
                className={`flex items-center justify-center mt-4 ${styles.infoContainer} min-h-[40px]`}
              >
                <span className="typography-b1">
                  **** **
                  <b className={styles.infoData}>
                    {cardInfo.pan.slice(0, 2) + " " + cardInfo.pan.slice(2)}
                  </b>{" "}
                  ****
                </span>
              </div>
              <div className="flex flex-row gap-4 mt-2">
                <div
                  className={`flex items-center justify-center px-2 ${styles.infoContainer} flex-1 min-h-[40px]`}
                >
                  <span className="typography-b1">
                    <span className={styles.infoPlaceholder}>CV/CVV</span>
                    <b className={styles.infoData}> {cardInfo.cvv ?? "-"}</b>
                  </span>
                </div>
                <div
                  className={`flex items-center justify-center px-2 ${styles.infoContainer} flex-1 min-h-[40px]`}
                >
                  <span className="typography-b1">
                    <span className={styles.infoPlaceholder}>PIN</span>
                    <b className={styles.infoData}> {cardInfo.pin ?? "-"}</b>
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-row justify-end min-h-[40px]">
                <MobileButton
                  onClick={() => {
                    setSelectedItem("f");
                    confirmationModal.handleCancel();
                  }}
                >
                  {t("close")}
                </MobileButton>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={styles.CarouselBlock}>
        <div className={styles.CarouselBlockMobile}>
          <BankCardsCarousel
            cardSize='lg'
            cards={cardsStorage.cards}
            refreshKey={cardsStorage.refreshKey}
            onSelect={(card) => {
              setCurrentCard(card);
              setCard(card);
              setSwitchChecked(card?.options?.limits?.disable);
            }}
          />
        </div>
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
            isMobile
          />
        )
      ) : (
        <>
          {card.isVirtual && (
            <MobileMenuItem
              onClick={onClick}
              dataItem="orderPlastic"
              leftPrimary={t("order_plastic_card")}
              rightPrimary={<Arrow />}
            />
          )}

          {card.cardStatus === "PLASTIC_IN_WAY" && (
            <MobileMenuItem
              onClick={onClick}
              dataItem="activate"
              leftPrimary={t("activate_card")}
            />
          )}

          {card.limits
            .sort((l) => (l.period === "MONTHLY" ? -1 : 1))
            .map((limit, index) => {
              return (
                <MobileMenuItem
                  progres={(limit.usedLimit / limit.currentLimit) * 100}
                  key={index}
                  onClick={onClick}
                  dataItem={limit.period.toLowerCase() + "Limit"}
                  leftSecondary={t("available")}
                  leftPrimary={t("set_limit", {
                    period: t(limit.period.toLowerCase()),
                  })}
                  rightPrimary={numberWithSpaces(limit.currentLimit) + " EUR"}
                  rightSecondary={numberWithSpaces(limit.usedLimit) + " EUR"}
                />
              );
            })}

          <MobileMenuItem
            dataItem="disableLimits"
            leftPrimary={t("disable_limits_for_minutes", { minutes: 3 })}
            rightPrimary={<Switch checked={switchChecked} />}
            onClick={onClick}
          />

          <MobileMenuItem
            dataItem="showData"
            leftPrimary={t("show_card_data")}
            onClick={onClick}
          />

          <a
            className={`${styles.link} typography-b1`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedItem("how-it-works");
            }}
          >
            How it works?
          </a>

          <div className="flex flex-row min-h-[43px] justify-between w-full mb-10">
            <MenuButton
              onClick={onClick}
              dataItem={
                card.cardStatus === "ACTIVE" ? "blockCard" : "unblockCard"
              }
              varitant="alarm"
              className="w-[135px] flex flex-row gap-1 items-center justify-center"
            >
              <Lock />{" "}
              <div>
                {card.cardStatus === "ACTIVE"
                  ? t("block_card")
                  : t("unblock_card")}
              </div>
            </MenuButton>
            <MenuButton
              onClick={() => setIsNewCardOpened(true)}
              varitant="light"
              className="w-[135px] flex flex-row gap-1 items-center justify-center"
            >
              <div>{t("order_new_card")}</div>
            </MenuButton>
          </div>

          <MobileModal
            title={t("confirm_action")}
            open={confirmationModal.isModalOpen}
            onCancel={confirmationModal.handleCancel}
            padding
          >
            {loading ? (
              <Loader />
            ) : (
              <div className={"min-w-[280px]"}>
                {selectedItem === "blockCard" && (
                  <div>
                    <div className={`row mb-5`}>
                      <div className="col flex flex-col items-center gap-3">
                        <Warning />
                        <h1 className={styles.blocker}>Block card</h1>
                        <p className={styles.ghost}>
                          Are you sure you want to
                          <br />
                          <b>Block selected bank card</b>?
                        </p>
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
                    <div className="flex flex-row min-h-[43px] justify-between">
                      <MobileButton
                        className={`w-[120px] ${styles.lightButton}`}
                      >
                        {t("confirm")}
                      </MobileButton>
                      {(selectedItem === "blockCard" ||
                        selectedItem === "dailyLimit" ||
                        selectedItem === "monthlyLimit") && (
                        <MobileButton
                          varitant={
                            selectedItem === "blockCard" ? "alarm" : "outline"
                          }
                          className="w-[120px]"
                          onClick={() => confirmationModal.handleCancel()}
                        >
                          {t("cancel")}
                        </MobileButton>
                      )}
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </MobileModal>

          <Modal
            title={t("card_info")}
            open={cardInfoModal.isModalOpen}
            padding
            onCancel={() => {
              cardInfoModal.handleCancel();
              setCardInfo(null);
            }}
          >
            {!cardInfo ? (
              <Loader className="relative my-10" />
            ) : (
              <div className="font-medium text-[16px]">
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
                <div className="col">
                  <Button size={"xl"} htmlType={"submit"} className="w-full">
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

export default MobileCardsMenu;
