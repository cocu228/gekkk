import { useLocation, useNavigate } from "react-router-dom";
import { FC, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import History from "@/widgets/history/ui/History";
import useModal from "@/shared/model/hooks/useModal";
import { apiCreateOrder } from "@/shared/(orval)api/gek";
import InviteLink from "@/shared/ui/invite-link/InviteLink";
import OpenOrders from "@/widgets/exchange/ui/open-orders/OpenOrders";
import { storeListExchangeRooms } from "@/shared/store/exchange-rooms/exchangeRooms";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { randomId } from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";
import useError from "@/shared/model/hooks/useError";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import CreateRoom from "@/shared/ui/create-room/CreateRoom";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Modal } from "@/shared/ui/modal/Modal";
import Wrapper from "@/shared/ui/wrapper";
import ExchangeCreateOrder from "@/widgets/exchange/components/exchange-create-order";
import InlineData from "@/widgets/exchange/ui/inline-data/InlineData";
import Button from "@/shared/ui/button/Button";

import { CtxExchangeData } from "../model/context";
import { ExchangeHeader } from "./exchangeHeader/ExchangeHeader";
import styles from "./style.module.scss";

const Exchange: FC = () => {
  // Hooks
  const { t } = useTranslation();
  const confirmModal = useModal();
  const loc = useLocation()
  const roomInfoModal = useModal();
  const { md, xxxl } = useBreakpoints();
  const navigate = useNavigate();
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();

  const [loading, setLoading] = useState<boolean>(false);
  const [ordersRefresh, setOrdersRefresh] = useState<string>("");
  const [historyFilter, setHistoryFilter] = useState<string[]>([]);
  const [hasValidationError, setHasValidationError] = useState<boolean>(false);

  // Store
  const { roomsList, getRoomsList } = storeListExchangeRooms(state => state);
  const { addRoom: addExchangeRoom } = storeListExchangeRooms(state => state);

  // Context
  const { currencies } = useContext(CtxCurrencies);
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
    onIsLimitOrderChange
  } = useContext(CtxExchangeData);

  useEffect(() => {
    console.log('LOC IS ', loc)
  }, [loc])

  // Handles
  const handleOnCreateOrder = async () => {
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
      post_only: false
    });

    setLoading(false);

    if (data.error) {
      localErrorHunter(data.error);
      return;
    }

    setOrdersRefresh(randomId());
    confirmModal.handleCancel();
  };

  // Effects
  useEffect(() => {
    if (!roomsList) {
      getRoomsList();
    }
  }, []);

  useEffect(() => {
    if (!(historyFilter.includes(from.currency) && historyFilter.includes(to.currency))) {
      setHistoryFilter([to.currency ? to.currency : null, from.currency ? from.currency : null]);
    }
  }, [from.currency, to.currency]);

  // Helpers
  const getHeadTitle = () => {
    switch (roomType) {
      case "default":
        return <span>{t("exchange.title")}</span>;
      // return (
      //   <DropdownC
      //     isOpen={roomInfoModal.isModalOpen}
      //     trigger={<span>{t("exchange.title")}</span>}
      //   >
      //     <DropdownCItem
      //       onClick={roomInfoModal.showModal}
      //       icon={<IconApp color="red" code="t33" size={20} />}
      //     >
      //       {t("exchange.create_private_exchange_room")}
      //     </DropdownCItem>
      //   </DropdownC>
      // );
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
          <div className=''>
            <b className='text-[#29354C]'>
              {from.currency}-{to.currency}
            </b>
            <span className='text-[#29354C]'> (ID: {roomInfo.timetick})</span>
            <button
              className='underline text-[#2BAB72] mt-[10px] flex items-end gap-[7px] font-semibold'
              onClick={roomInfoModal.showModal}
            >
              <IconApp code='t34' color='#285E69' size={17} /> {t("exchange.invite_link")}
            </button>
          </div>
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

  if (!currencies) return null;

  return !roomsList ? (
    <Loader className='relative' />
  ) : (
    <div className=' '>
      {md ? null : (
        // TODO: Refactor header
        <ExchangeHeader
          privateRoomInfo={roomInfo}
          title={getHeadTitle()}
          text={<span className='select-text'>{getHeadSubtitle()}</span>}
        />
      )}

      <div className={styles.Container}>
        <div className={styles.Main}>
          <ExchangeCreateOrder
            to={to}
            from={from}
            price={price}
            roomType={roomType}
            roomInfo={roomInfo}
            showModal={confirmModal.showModal}
            currencies={currencies}
            hasValidationError={hasValidationError}
            setHasValidationError={setHasValidationError}
            isLimitOrder={isLimitOrder}
            onToValueChange={onToValueChange}
            onCurrenciesSwap={onCurrenciesSwap}
            onFromValueChange={onFromValueChange}
            onToCurrencyChange={onToCurrencyChange}
            onFromCurrencyChange={onFromCurrencyChange}
            onIsLimitOrderChange={onIsLimitOrderChange}
          />
          <Wrapper isWeb className={"md:px-[10px]"}>
            <OpenOrders refreshKey={ordersRefresh} />
          </Wrapper>
          {xxxl ? (
            <Wrapper isWeb className={"md:px-[10px]"}>
              <p className='text-[12px] hidden xxxl:block ml-[4px] mt-[2px] text-[#29354C] font-bold'>
                {t("last_transactions")}
              </p>
              <History currenciesFilter={historyFilter} types={[2, 15, 16, 20]} />
            </Wrapper>
          ) : null}
        </div>
        {!xxxl ? (
          <div className={styles.Main}>
            <Wrapper isWeb>
              <p className='text-[12px] ml-[4px] mt-[2px] text-[#29354C] font-bold'>{t("last_transactions")}</p>
              <History currenciesFilter={historyFilter} types={[2, 15, 16, 20]} />
            </Wrapper>
          </div>
        ) : null}
      </div>
      <Modal title={t("confirm_the_order")} isModalOpen={confirmModal.isModalOpen} onCancel={confirmModal.handleCancel}>
        <div className='px-5 mt-4'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='flex items-start'>
              <IconApp color='#8F123A' size={15} code='t27' />
            </div>

            <span className='text-fs12 md:text-[10px] text-[var(--gek-dark-grey)]'>
              {t("check_your_information_carefully")}
            </span>
          </div>

          <div className='text-[var(--gek-dark-grey)] md:text-[12px] text-fs12 mb-4'>
            {t("order_type")}:{" "}
            <span className='font-semibold text-[var(--gek-additional)]'>{isLimitOrder ? "Limit" : "Market"}</span>
          </div>

          <InlineData left='You pay' center={from.amount} right={from.currency} />
          {!isLimitOrder ? null : (
            <>
              <InlineData left='Get no less' center={to.amount} right={to.currency} />
              <InlineData left='Price' center={price.amount} right={`${from.currency}/${to.currency}`} />
            </>
          )}

          {localErrorInfoBox && <div className='my-4'>{localErrorInfoBox}</div>}

          <div className='flex flex-col mt-6 md:mt-[20px] gap-1 md:gap-[15px]'>
            <div className='text-secondary text-xs md:text-[10px] md:text-[var(--new-mid-grey)] text-center'>
              {t("exchange.broker_exchange_fee")}
            </div>

            <div className='flex justify-between gap-4'>
              <Button disabled={loading} className='w-full' onClick={handleOnCreateOrder}>
                {t("confirm")}
              </Button>

              <Button color='gray' disabled={loading} className='w-full' onClick={confirmModal.handleCancel}>
                {t("cancel")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title={roomType == "default" ? t("exchange.open_private_exchange_room") : t("invite_link")}
        isModalOpen={roomInfoModal.isModalOpen}
        onCancel={roomInfoModal.handleCancel}
      >
        {roomType === "default" ? (
          <CreateRoom
            to={to}
            from={from}
            onCurrenciesSwap={onCurrenciesSwap}
            onToCurrencyChange={onToCurrencyChange}
            onFromCurrencyChange={onFromCurrencyChange}
            onCancel={roomInfoModal.handleCancel}
            onRoomCreation={roomInfo => {
              addExchangeRoom(roomInfo);
              roomInfoModal.handleCancel();
              navigate(`/private-room?roomId=${roomInfo.timetick}`);
            }}
          />
        ) : (
          <InviteLink roomInfo={roomInfo} />
        )}
      </Modal>
    </div>
  );
};

export default Exchange;
