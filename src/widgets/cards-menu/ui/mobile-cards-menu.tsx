import { Switch } from "antd";
import { NewCard } from "./new-card";
import Loader from "@/shared/ui/loader";
import Form from "@/shared/ui/form/Form";
import styles from "./style.module.scss";
import {
  MouseEvent,
  MouseEventHandler,
  useContext,
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
import { CtxRootData } from "@/processes/RootContext";
import { IconApp } from "@/shared/ui/icons/icon-app";

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

  const {account} = useContext(CtxRootData)

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
  }, [account]);

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
        <div className={styles.HowItWorksWrap}>
          <p className={`typography-b1 ${styles.howText}`}>
            {t("the_function_of_setting_disabling_limits_allows")}
            <br />
            -{t("cash_withdrawal_from_the_card")}
            <br />
            -{t("payment_of_purchases_on_the_card")}
            <br />
            {t("day_limit")}
            <br />
            {t("it_is_possible_to_indicate_the_maximum_amount_of_transactions")}
            <br />
            {t("month_limit")}
            <br />
            {t("here_it_is_possible_to_indicate_the_amount_of_expenses")}
            <br />
            {t("temporarily_disable_limits")}
            <br />
            {t("to_temporarily_deactivate_daily_and_monthly_limits")}
          </p>
          <div className={styles.HowItWorksBtnWrap}>
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
      <div
        className={styles.ShowDataWrap}
      >
        <div className="substrate flex rounded-lg w-full">
          {!cardInfo ? (
            <Loader className="relative my-10" />
          ) : (
            <div className="font-medium text-[16px]">
              <div className="flex flex-row gap-2">
                <IconApp color="#8F123A" size={22} code="t27" />
                <h3 className="typogrhaphy-b1 text-[12px]" color="dark-green">
                  {t("be_careful")}
                </h3>
              </div>

              <div
                className={`${styles.InfoContainerFirst} ${styles.infoContainer}`}
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
                  className={`${styles.InfoContainerSecond} ${styles.infoContainer}`}
                >
                  <span className="typography-b1">
                    <span className={styles.infoPlaceholder}>CV/CVV</span>
                    <b className={styles.infoData}> {cardInfo.cvv ?? "-"}</b>
                  </span>
                </div>
                <div
                  className={`${styles.InfoContainerSecond} ${styles.infoContainer}`}
                >
                  <span className="typography-b1">
                    <span className={styles.infoPlaceholder}>PIN</span>
                    <b className={styles.infoData}> {cardInfo.pin ?? "-"}</b>
                  </span>
                </div>
              </div>

              <div className={styles.InfoBtnWrap}>
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
    <div className={styles.CarouselWrap}>
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
              rightPrimary={<IconApp code="t08" color="#888a92" size={12} />}
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
            {t("how_it_works")}
          </a>

          <div className={styles.FooterBtnsWrap}>
            <MenuButton
              onClick={onClick}
              dataItem={
                card.cardStatus === "ACTIVE" ? "blockCard" : "unblockCard"
              }
              varitant="alarm"
              className="w-[135px] flex flex-row gap-1 items-center justify-center"
            >
              <IconApp code="t54" size={10} color="#fff" />
              <div>
                {card.cardStatus === "ACTIVE"
                  ? t("block_card")
                  : t("unblock_card")}
              </div>
            </MenuButton>
            <MenuButton
              onClick={() => setIsNewCardOpened(true)}
              varitant="light"
              className={styles.FooterLightBtn}
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
                      <div className={styles.WarningWrap}>
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
                    <div className={styles.FormBody}>
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
