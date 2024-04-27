import Loader from "@/shared/ui/loader";
import styles from "./style.module.scss";
import Modal from "@/shared/ui/modal/Modal";
import { useNavigate } from "react-router-dom";
import { randomId } from "@/shared/lib/helpers";
import Button from "@/shared/ui/button/Button";
import { CtxExchangeData } from "../model/context";
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
import PercentSelector from "@/shared/ui/input-currency/ui/percent-selector/PercentSelector";
import { IconApp } from "@/shared/ui/icons/icon-app";

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
                    icon={<IconApp color="red" code="t33" size={20} />}
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
                <div className="font-medium flex flex-col gap-[5px] -sm:flex-row -sm:items-center items-start justify-between w-full text-md lg:text-sm md:text-xs mb-2 select-none">
                  {t("exchange.you_pay")}
                  <PercentSelector
                    onSelect={onFromValueChange}
                    currency={currencies.get(from.currency)}
                  />
                </div>
                <SelectToken
                  isBalance={true}
                  roomType={roomType}
                  currency={from.currency}
                  value={from.amount ?? ""}
                  onSelect={onFromCurrencyChange}
                  onError={setHasValidationError}
                  onChange={onFromValueChange}
                  excludedCurrencies={[to.currency]}
                  allowedFlags={[CurrencyFlags.ExchangeAvailable]}
                />
                <div className={`flex justify-center ${styles.FieldsSpacer}`}>
                  <div
                    onClick={onCurrenciesSwap}
                    className={`${styles.SwapButton} ${
                      !(from.currency && to.currency) ? styles.Disabled : ""
                    }`}
                  >
                    <IconApp code='t36' size={27} color="#B9B9B5" />
                  </div>
                </div>

                <div className="font-medium text-md lg:text-sm md:text-xs mb-2 select-none">
                  {t("exchange.get_no_less")}
                </div>

                <SelectToken
                  isBalance={false}
                  roomType={roomType}
                  currency={to.currency}
                  value={to.amount ?? ""}
                  onChange={onToValueChange}
                  onSelect={onToCurrencyChange}
                  excludedCurrencies={[from.currency]}
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
              title="Confirm the order"
              open={confirmModal.isModalOpen}
              onCancel={confirmModal.handleCancel}
            >
              <div className="px-5">
                <div className="flex items-center gap-2 mb-4">
                  <IconApp size={24} code="t27" color="#8F123A" />

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
              <History currenciesFilter={historyFilter} types={[2, 15, 16, 20]} />
            </div>
          )
        }
      />
      {md && (
        <div className="w-full rounded-lg">
          <History currenciesFilter={historyFilter} types={[2, 15, 16, 20]} />
        </div>
      )}
      <Modal
        width={450}
        open={roomInfoModal.isModalOpen}
        onCancel={roomInfoModal.handleCancel}
        padding
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
            onCurrenciesSwap={onCurrenciesSwap}
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
        padding
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
