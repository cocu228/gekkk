import Loader from "@/shared/ui/loader";
import styles from "./style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import { useNavigate } from "react-router-dom";
import { randomId } from "@/shared/lib/helpers";
import Button from "@/shared/ui/button/Button";
import { CtxExchangeData } from "../model/context";
import IconSwap from "@/shared/ui/icons/IconSwap";
import History from "@/widgets/history/ui/History";
import useModal from "@/shared/model/hooks/useModal";
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import { useContext, useEffect, useState } from "react";
import PageHead from "@/shared/ui/page-head/PageHead";
import SplitGrid from "@/shared/ui/split-grid/SplitGrid";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { apiCloseRoom } from "@/shared/(orval)api/gek";
import { apiCreateOrder } from "@/shared/(orval)api/gek";
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import RoomProperties from "./room-properties/RoomProperties";
import IconPrivateRoom from "@/shared/ui/icons/IconPrivateRoom";
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";
import PriceField from "@/widgets/exchange/ui/price-field/PriceField";
import OpenOrders from "@/widgets/exchange/ui/open-orders/OpenOrders";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";
import DepthOfMarket from "@/widgets/exchange/ui/depth-of-market/DepthOfMarket";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import ParticipantsNumber from "@/shared/ui/participants-number/ParticipantsNumber";
import OperationResult from "@/widgets/exchange/ui/operation-result/OperationResult";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { useTranslation } from "react-i18next";
import {
  validateBalance,
  validateMinimumAmount,
} from "@/shared/config/validators";
import Decimal from "decimal.js";
import useError from "@/shared/model/hooks/useError";
import InlineProperty from "@/shared/ui/inline-property";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import CreateRoom from "@/shared/ui/create-room/CreateRoom";
import InlineData from "./inline-data/InlineData";
import { SelectToken } from "../components/selectToken/SelectToken";

function Exchange() {
  const { currencies } = useContext(CtxCurrencies);

  if (!currencies) return null;

  const { t } = useTranslation();

  const confirmModal = useModal();
  const roomInfoModal = useModal();
  const cancelRoomModal = useModal();

  const { md } = useBreakpoints();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [ordersRefresh, setOrdersRefresh] = useState<string>("");
  const [historyFilter, setHistoryFilter] = useState<string[]>([]);
  const { roomsList, getRoomsList } = storeListExchangeRooms((state) => state);
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);
  const { addRoom: addExchangeRoom, removeRoom: closeExchangeRoom } =
    storeListExchangeRooms((state) => state);

  const {
    to,
    from,
    price,
    roomType,
    roomInfo,
    isLimitOrder,
    onToValueChange,
    onCurrenciesSwap,
    onFromValueChange,
    onToCurrencyChange,
    onFromCurrencyChange,
    onIsLimitOrderChange,
  } = useContext(CtxExchangeData);

  useEffect(() => {
    if (!roomsList) {
      getRoomsList();
    }
  }, []);

  useEffect(() => {
    if (
      !(
        historyFilter.includes(from.currency) &&
        historyFilter.includes(to.currency)
      )
    ) {
      setHistoryFilter([
        to.currency ? to.currency : null,
        from.currency ? from.currency : null,
      ]);
    }
  }, [from.currency, to.currency]);

  const getHeadTitle = () => {
    switch (roomType) {
      case "default":
        return (
          <Dropdown
            isOpen={roomInfoModal.isModalOpen}
            trigger={<span>{t("exchange.title")}</span>}
            items={[
              {
                key: "1",
                label: (
                  <DropdownItem
                    onClick={roomInfoModal.showModal}
                    icon={<IconPrivateRoom />}
                  >
                    {t("exchange.create_private_exchange_room")}
                  </DropdownItem>
                ),
              },
            ]}
          />
        );
      case "creator":
        return `Private room`;
      case "visitor":
        return `Private room`;
    }
  };

  const getHeadSubtitle = () => {
    switch (roomType) {
      case "default":
        return t("exchange.describe");
      case "creator":
        return (
          <>
            <b>
              {from.currency} - {to.currency}
            </b>
            <span> (id: {roomInfo.timetick})</span>
            <p>{t("exchange.owner_private_room")}</p>
            <button
              className="underline text-accent"
              onClick={roomInfoModal.showModal}
            >
              {t("exchange.invite_link")}
            </button>
          </>
        );
      case "visitor":
        return (
          <>
            <b>
              {from.currency} - {to.currency}
            </b>
            <span> (id: {roomInfo.timetick})</span>
          </>
        );
    }
  };

  const minAmount = currencies.get(from.currency)
    ? new Decimal(currencies.get(from.currency)?.minOrder).toNumber()
    : 0;

  const createOrder = async () => {
    localErrorClear();
    setLoading(true);

    const { data } = await apiCreateOrder({
      from_currency: from.currency,
      to_currency: to.currency,
      from_amount: from.amount,
      to_amount: isLimitOrder ? to.amount : null,
      client_nonce: 0,
      is_limit: isLimitOrder,
      room_key: roomType === "default" ? 0 : +roomInfo.timetick,
      post_only: false,
    });

    setLoading(false);

    if (data.error) {
      localErrorHunter(data.error);
      return;
    }

    setOrdersRefresh(randomId());
    confirmModal.handleCancel();
  };

  const closeRoom = async () => {
    localErrorClear();

    const { data } = await apiCloseRoom({
      roomId: roomInfo.timetick,
    });

    if (data.error) {
      localErrorHunter(data.error);
      return;
    }

    closeExchangeRoom(roomInfo.timetick);
    cancelRoomModal.handleCancel();
    navigate("/exchange");
  };

  return !roomsList ? (
    <Loader className="relative" />
  ) : (
    <div className="wrapper md:-mt-5">
      {md ? null : (
        <PageHead
          title={getHeadTitle()}
          subtitle={getHeadSubtitle()}
          rightContent={
            roomType !== "creator" ? null : (
              <ParticipantsNumber
                quantity={roomInfo.count}
                onLeave={cancelRoomModal.showModal}
                onIconClick={roomInfoModal.showModal}
              />
            )
          }
        />
      )}

      <SplitGrid
        leftColumn={
          <div className="py-5 px-10 lg:px-5 md:px-4">
            <div className={`gap-x-14 xl:gap-x-2 ${styles.Grid}`}>
              <div className="h-full flex flex-col">
                <div className="font-medium text-md lg:text-sm md:text-xs mb-2 select-none">
                  {t("exchange.you_pay")}
                </div>
                <SelectToken
                  isValidator={true}
                  valueChange={onFromValueChange}
                  currency={from.currency}
                  roomType={roomType}
                  onSelect={onFromCurrencyChange}
                  excludedCurrencies={[to.currency]}
                  allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                />
                {/* <InputCurrency.Validator
                  className="text-sm"
                  value={+from.amount}
                  onError={setHasValidationError}
                  description={
                    !from.currency
                      ? null
                      : t("minimum_order_amount", {
                          amount:
                            currencies.get(from.currency)?.minOrder +
                            " " +
                            from.currency,
                        })
                  }
                  validators={[
                    validateBalance(currencies.get(from.currency), navigate, t),
                    validateMinimumAmount(
                      minAmount,
                      +from.amount,
                      from.currency,
                      t
                    ),
                  ]}
                ></InputCurrency.Validator>
                <InputCurrency.CurrencySelector
                  balanceFilter
                  onSelect={onFromCurrencyChange}
                  disabled={roomType !== "default"}
                  excludedCurrencies={[to.currency]}
                  allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                >
                  <InputCurrency.Validator
                    className="text-sm"
                    value={+from.amount}
                    onError={setHasValidationError}
                    description={
                      !from.currency
                        ? null
                        : t("minimum_order_amount", {
                            amount:
                              currencies.get(from.currency)?.minOrder +
                              " " +
                              from.currency,
                          })
                    }
                    validators={[
                      validateBalance(
                        currencies.get(from.currency),
                        navigate,
                        t
                      ),
                      validateMinimumAmount(
                        minAmount,
                        +from.amount,
                        from.currency,
                        t
                      ),
                    ]}
                  >
                    <InputCurrency.DisplayBalance
                      currency={currencies.get(from.currency)}
                    >
                      <InputCurrency
                        value={from.amount}
                        currency={from.currency}
                        onChange={onFromValueChange}
                      />
                    </InputCurrency.DisplayBalance>
                  </InputCurrency.Validator>
                </InputCurrency.CurrencySelector> */}
                <div className={`flex justify-center ${styles.FieldsSpacer}`}>
                  <div
                    onClick={onCurrenciesSwap}
                    className={`${styles.SwapButton} ${
                      !(from.currency && to.currency) ? styles.Disabled : ""
                    }`}
                  >
                    <IconSwap />
                  </div>
                </div>

                <div className="font-medium text-md lg:text-sm md:text-xs mb-2 select-none">
                  {t("exchange.get_no_less")}
                </div>

                <SelectToken
                  valueChange={onToValueChange}
                  isValidator={false}
                  currency={to.currency}
                  roomType={roomType}
                  onSelect={onToCurrencyChange}
                  excludedCurrencies={[to.currency]}
                  allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                />
                {/* <InputCurrency.CurrencySelector
                  className="mt-0"
                  onSelect={onToCurrencyChange}
                  disabled={roomType !== "default"}
                  excludedCurrencies={[from.currency]}
                  allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                >
                  <InputCurrency
                    value={to.amount}
                    currency={to.currency}
                    disabled={!isLimitOrder}
                    onChange={onToValueChange}
                  />
                </InputCurrency.CurrencySelector> */}

                <div className="mt-3 md:mt-2 ">
                  <div className="font-medium text-md lg:text-sm md:text-xs">
                    {t("price")}
                  </div>
                  <PriceField disabled={!isLimitOrder} />
                </div>

                {roomType === "creator" && (
                  <div className="mt-6 md:mt-3.5 ">
                    <Checkbox
                      defaultChecked={!isLimitOrder}
                      onChange={onIsLimitOrderChange}
                    >
                      <span className="lg:text-sm md:text-xs sm:text-[0.625rem]">
                        {t("exchange.sell")}
                        <strong className="font-semibold">
                          {" "}
                          {from.currency}
                        </strong>{" "}
                        {t("exchange.at_the_market_rate")}
                      </span>
                    </Checkbox>
                  </div>
                )}

                <div className="mt-10 md:mt-6">
                  <OperationResult />
                </div>
              </div>

              <div className="wrapper">
                <DepthOfMarket
                  currencyFrom={from.currency}
                  currencyTo={to.currency}
                  roomKey={roomInfo?.timetick.toString() ?? null}
                  isSwapped={price.isSwapped}
                />
              </div>

              <div className={`mt-7 ${styles.GridFooter}`}>
                <Button
                  className="w-full"
                  size="xl"
                  disabled={
                    (!isLimitOrder ? +from.amount <= 0 : +price.amount <= 0) ||
                    hasValidationError
                  }
                  onClick={confirmModal.showModal}
                >
                  {t("exchange.create_order")}
                </Button>

                <div className="mt-5 lg:mt-2.5 px-8 text-secondary text-xs text-center">
                  {t("exchange.broker_exchange_fee")}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <OpenOrders refreshKey={ordersRefresh} />
            </div>

            <Modal
              width={400}
              padding={false}
              title="Confirm the order"
              open={confirmModal.isModalOpen}
              onCancel={confirmModal.handleCancel}
            >
              <div className="px-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.93073 0.540263C8.09863 -0.180088 6.90137 -0.180088 6.06927 0.540263C5.40746 1.11329 4.45697 1.9803 3.2188 3.2188C1.9803 4.45697 1.11362 5.40712 0.540263 6.06894C-0.180088 6.90104 -0.180088 8.09863 0.540263 8.93073C1.11329 9.59254 1.9803 10.5427 3.2188 11.7809C4.45697 13.0194 5.40712 13.8864 6.06894 14.4597C6.90104 15.1801 8.09863 15.1801 8.93073 14.4597C9.59254 13.8864 10.543 13.0197 11.7812 11.7812C13.0197 10.5427 13.8864 9.59288 14.4597 8.93073C15.1801 8.09863 15.1801 6.90104 14.4597 6.06894C13.8864 5.40712 13.0197 4.45697 11.7812 3.2188C10.543 1.9803 9.59254 1.11362 8.93073 0.540263ZM6.21627 4.55241C6.18568 4.1214 6.37923 3.69704 6.79827 3.59195C7.02798 3.53544 7.26378 3.50752 7.50033 3.5088C7.7777 3.5088 8.01183 3.54405 8.20206 3.59195C8.62143 3.69704 8.81499 4.12107 8.78406 4.55241C8.72087 5.44903 8.59982 7.00613 8.46878 7.87913C8.42555 8.16681 8.25261 8.41424 7.96593 8.46246C7.84321 8.48308 7.6899 8.49772 7.50033 8.49772C7.31077 8.49772 7.15745 8.48308 7.03473 8.46246C6.74805 8.41424 6.57478 8.16647 6.53188 7.87913C6.40085 7.00613 6.27979 5.44903 6.21627 4.55241ZM7.5 11.8234C7.65286 11.8234 7.80422 11.7933 7.94544 11.7348C8.08667 11.6763 8.21499 11.5906 8.32307 11.4825C8.43116 11.3744 8.5169 11.2461 8.5754 11.1049C8.6339 10.9637 8.664 10.8123 8.664 10.6594C8.664 10.5066 8.6339 10.3552 8.5754 10.214C8.5169 10.0728 8.43116 9.94445 8.32307 9.83636C8.21499 9.72827 8.08667 9.64253 7.94544 9.58404C7.80422 9.52554 7.65286 9.49543 7.5 9.49543C7.19129 9.49543 6.89522 9.61807 6.67693 9.83636C6.45863 10.0547 6.336 10.3507 6.336 10.6594C6.336 10.9681 6.45863 11.2642 6.67693 11.4825C6.89522 11.7008 7.19129 11.8234 7.5 11.8234Z"
                      fill="#8F123A"
                    />
                  </svg>

                  <span className="text-fs12 text-[#7B797C]">
                    {t("check_your_information_carefully")}
                  </span>
                </div>

                <div className="text-[#7B797C] text-fs12 mb-4">
                  Order type:{" "}
                  <span className="font-semibold text-[#285E69]">
                    {isLimitOrder ? "Limit" : "Market"}
                  </span>
                </div>

                <InlineData
                  left="You pay"
                  center={from.amount}
                  right={from.currency}
                />
                {!isLimitOrder ? null : (
                  <>
                    <InlineData
                      left="Get no less"
                      center={to.amount}
                      right={to.currency}
                    />
                    <InlineData
                      left="Price"
                      center={price.amount}
                      right={`${from.currency}/${to.currency}`}
                    />
                  </>
                )}

                <div className="my-4">{localErrorInfoBox}</div>

                <div className="flex flex-col mt-6 md:mt-12 gap-1">
                  <div className="text-secondary text-xs text-center">
                    {t("exchange.broker_exchange_fee")}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      disabled={loading}
                      className="w-full"
                      onClick={createOrder}
                    >
                      {t("confirm")}
                    </Button>

                    <Button
                      gray
                      disabled={loading}
                      className="w-full"
                      onClick={confirmModal.handleCancel}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        }
        rightColumn={
          !md && (
            <div className="w-full rounded-lg py-5 px-10 lg:px-5 md:px-4 ">
              <History currenciesFilter={historyFilter} types={[2, 15, 16]} />
            </div>
          )
        }
      />
      {md && (
        <div className="w-full rounded-lg py-5 px-10 lg:px-5 md:px-4 ">
          <History currenciesFilter={historyFilter} types={[2, 15, 16]} />
        </div>
      )}
      <Modal
        width={450}
        open={roomInfoModal.isModalOpen}
        onCancel={roomInfoModal.handleCancel}
        title={
          roomType == "default"
            ? t("exchange.open_private_exchange_room")
            : t("invite_link")
        }
        className={styles.RoomModal}
      >
        {roomType === "default" ? (
          <CreateRoom
            to={to}
            from={from}
            onToCurrencyChange={onToCurrencyChange}
            onFromCurrencyChange={onFromCurrencyChange}
            onRoomCreation={(roomInfo) => {
              addExchangeRoom(roomInfo);
              roomInfoModal.handleCancel();
              navigate(`/private-room?roomId=${roomInfo.timetick}`);
            }}
          />
        ) : (
          <InviteLink roomInfo={roomInfo} />
        )}
      </Modal>

      <Modal
        width={450}
        title={`${
          roomType === "creator" ? t("exchange.close") : t("exchange.leave")
        } ${t("exchange.private_exchange_room")}`}
        open={cancelRoomModal.isModalOpen}
        onCancel={cancelRoomModal.handleCancel}
      >
        <div className="text-sm">
          {t("exchange.are_you_sure")}{" "}
          {roomType === "creator"
            ? t("exchange.close_private_exchange")
            : t("exchange.leave_private_exchange")}
          {t("exchange.unclosed_orders")}.
        </div>

        {roomType !== "creator" ? null : (
          <>
            <div className="mt-4 mb-2 font-medium">
              {t("exchange.room_description")}:
            </div>
            <RoomProperties room={roomInfo} />
          </>
        )}

        <div className="mt-4">{localErrorInfoBox}</div>

        <div className="mt-8 sm:mt-4">
          <Button size="xl" className="w-full" onClick={closeRoom}>{`${
            roomType === "creator" ? t("exchange.close") : t("exchange.leave")
          } ${t("exchange.private_exchange_room")}`}</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Exchange;
